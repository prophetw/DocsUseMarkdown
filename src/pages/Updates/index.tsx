import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from 'antd'
import { Footer } from 'antd/es/layout/layout';

import MarkdownIt from "markdown-it/lib";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import VersionPage from '../VersionPage/Version';

// 
const StaticBase = './Updates/'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 使用highlight.js进行代码高亮
        return '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>';
      } catch (__) { }
    }

    // 使用默认的escape功能
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

const UpdatesPage: React.FC = () => {
  const [versionAry, setVersionAry] = useState<string[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(3);
  const [pageToVerListMap, setPageToVerListMap] = useState<Map<number, string[]>>(new Map());
  const [showVerAry, setShowVerAry] = useState<string[]>([]);

  useEffect(() => {
    const getUpdateMeta = async () => {
      const res = await axios.request({
        method: 'get',
        url: `${StaticBase}meta.json?${new Date().getTime()}`,
      })
      if (res.status === 200) {
        const data = res.data && res.data.updateAry
        if (Array.isArray(data) && data.length > 0) {
          setVersionAry(data as string[])
        }
      }
      console.log(res);
    }
    getUpdateMeta();
  }, [])

  const renderPage = (pageNo: number) => {
    console.log(' pageNo ', pageNo);
    const verList = pageToVerListMap.get(pageNo);
    console.log(' verList ', verList);
    if(verList){
      setShowVerAry([...verList] as string[])
    }
  }
  useEffect(() => {
    console.log(versionAry);
    // complete pageToVerListMap
    pageToVerListMap.clear();
    const map = pageToVerListMap;
    versionAry.forEach((ver, index) => {
      const pageNo = Math.floor(index / pageSize) + 1;
      if (map.has(pageNo)) {
        const verList = map.get(pageNo) as string[];
        verList.push(ver);
        map.set(pageNo, verList);
      } else {
        map.set(pageNo, [ver]);
      }
    })
    setPageToVerListMap(map);

    renderPage(1);
    return ()=>{
      setPageToVerListMap(new Map());
      setPageNo(0);
    }
  }, [versionAry, pageSize])

  useEffect(() => {
    renderPage(pageNo);
  }, [pageNo])


  const handlePageChange = (pageNo: number, pageSize?: number) => {
    setPageNo(pageNo);
    if (pageSize) {
      setPageSize(pageSize);
    }
  }


  return (
    <PageContainer ghost>
      <div className={styles.container} id="md-container">
        {/* { isLoading && <LoadingOutlined style={{fontSize: 100}} />} */}
        { showVerAry.map((ver, index) => {
          return <VersionPage ver={ver} key={index} />
        })}
      </div>
      <Footer>
        <Pagination
          pageSize={pageSize}
          current={pageNo}
          total={versionAry.length}
          onChange={handlePageChange}

        />
      </Footer>
    </PageContainer>
  );
};

export default UpdatesPage;
