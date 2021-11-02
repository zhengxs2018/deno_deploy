# Deno deploy

基于 [Deno Deploy](https://deno.com/deploy/docs/) 的前后端一体化开发。

## 快速开始

你需要全局安装 [deno]。

```bash
# 启动服务 - 生产模式
$ deno run --no-check --allow-net --allow-read ./main.ts

# 启动服务 - 开发模式
$ deno run --watch --no-check --allow-net --allow-read ./main.ts

# 启用检查器
$ deno run --inspect --no-check --allow-net --allow-read ./main.ts
```

因为类型问题，启动的时候需要携带 `--no-check` 防止类型错误。

`--allow-net` 和 `--allow-read` 参数是因为使用 `mime_types` 这个库。

## License

- MIT

[deno]: https://deno.land/manual/getting_started/installation
