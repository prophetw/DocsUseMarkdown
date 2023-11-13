import styles from './index.less';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import md from '@/services/markdownIt';


interface VersionMetaInfo {
  mdFile: string;
  title: string;
  downloadAry: {
    name: string;
    url: string;
  }[];
};

interface Props {
	ver: string
}

const VersionPage = (props: Props) => {
	const { ver } = props
	console.log(' props ', props);
	console.log('ver Page ----- ', ver);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const curDiv = divRef.current;
		if (curDiv === null) return;
		// from link
		const StaticBase = './Updates/'
		const metaInfoUrl = `${StaticBase}${ver}/meta.json`;
		axios.get(metaInfoUrl)
			.then(response => {
				const metaInfoUrl = response.data as VersionMetaInfo;
				console.log(metaInfoUrl);
				const { mdFile } = metaInfoUrl;
				const markdownUrl = `${StaticBase}${ver}/${mdFile}`;
				axios.get(markdownUrl)
					.then(response => {
						const markdownContent = response.data;
						const baseUrl = `${StaticBase}${ver}/`;
						const htmlResult = md.render(markdownContent, {
							baseUrl,
						})
						if (curDiv) {
							const divItem = document.createElement('div')
							divItem.className = styles.md_item_container
							divItem.innerHTML = htmlResult;
							curDiv.appendChild(divItem)
						}
					})
					.catch(error => {
						// 处理错误情况
						console.error('加载Markdown文件出错:', error);
					});
				// const div = document.getElementById('updates');
				// if(div){
				//   div.innerHTML = markdownContent;
				// }
			})
			return () => {
				if (curDiv) {
					curDiv.innerHTML = ''
				}
			}

	}, [ver, divRef])

	return (
		<div ref={divRef}>
		</div>
	);
};

export default VersionPage;
