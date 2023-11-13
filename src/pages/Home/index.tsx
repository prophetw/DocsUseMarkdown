
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import md from '@/services/markdownIt';

const HomePage: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const curDiv = divRef.current;
    if(curDiv === null) return;
    // from link
    const staticBase = './Overview/'
    const markdownUrl = `${staticBase}Luban_Motor_BIM_JavaScript_SDK.md`;
    axios.get(markdownUrl)
      .then(response => {
        const markdownContent = response.data;
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

export default HomePage;