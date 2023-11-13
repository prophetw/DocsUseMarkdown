
import MarkdownIt from "markdown-it/lib";
// import SDK_MD from './Luban_Motor_BIM_JavaScript_SDK.md'
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

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

const defaultRender = md.renderer.rules.image || function (tokens, idx, options, env, self) {
	return self.renderToken(tokens, idx, options);
};

const defaultLinkRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
	return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	// 修改token的URL
	const baseUrl = env.baseUrl
	const token = tokens[idx];
	const srcIndex = token.attrIndex('href');
	if (srcIndex >= 0) {
		const url = token.attrs[srcIndex][1];
		// 仅当URL不是绝对路径时添加baseUrl
		if (!url.startsWith('http://') && !url.startsWith('https://')) {
			token.attrs[srcIndex][1] = baseUrl + url;
		}
	}

	// 使用修改后的token渲染图片
	return defaultLinkRender(tokens, idx, options, env, self);
};
md.renderer.rules.image = function (tokens, idx, options, env, self) {
	// 修改token的URL
	const baseUrl = env.baseUrl
	const token = tokens[idx];
	const srcIndex = token.attrIndex('src');
	if (srcIndex >= 0) {
		const url = token.attrs[srcIndex][1];
		// 仅当URL不是绝对路径时添加baseUrl
		if (!url.startsWith('http://') && !url.startsWith('https://')) {
			token.attrs[srcIndex][1] = baseUrl + url;
		}
	}

	// 使用修改后的token渲染图片
	return defaultRender(tokens, idx, options, env, self);
};

export default md;