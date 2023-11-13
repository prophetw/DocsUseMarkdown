import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import md from '@/services/markdownIt';



const GuidePage: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const curDiv = divRef.current;
    if (curDiv === null) return;
    // from link
    const staticBase = './Guide/'
    const markdownUrl = `${staticBase}Luban_Motor_JavaScript_SDK_Guide.md`;
    axios.get(markdownUrl)
      .then(response => {
        const markdownContent = response.data;
        // 获取默认的图片渲染规则
        const htmlResult = md.render(markdownContent, {
          baseUrl: staticBase,
        })
        curDiv.innerHTML = htmlResult
      })
      .catch(error => {
        // 处理错误情况
        console.error('加载Markdown文件出错:', error);
      });

  }, [divRef])

  return (
    <PageContainer ghost>
      <div className={styles.container} ref={divRef}>
      </div>
    </PageContainer>
  );
};

export default GuidePage;
