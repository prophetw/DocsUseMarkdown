# Start
```bash
# install deps
pnpm i

# start 
pnpm start

# build
pnpm build
```

# 使用
> Updates/v1.5.1 按照正常的 markdown 语法编写即可，然后在 Updates/meta.json 里面添加新的版本号即可。
> 最终会把 markdown 以及静态资源，正确的渲染出来。



### public
```bash
.
├── Guide # 使用指南
│   └── images
├── Overview # 概览
│   ├── Tex 
│   └── images 
└── Updates  # 版本更新记录
    └── v1.5.1
        └── resources # 资源文件
						└── images # 图片资源

```

> 说明：public 目录下的文件会被复制到最终的打包目录中，所以可以在这里放一些静态资源，比如图片、字体等。
> 比如需要一个新的 Updates 那么就把 Updates/v1.5.1 复制一份，然后修改里面的内容即可。最后把 Updates/meta.json 里面添加新的版本号即可。