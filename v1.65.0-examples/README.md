# Playwright v1.65.0 Examples

The v1.65 examples are measured experiments. Each one has its own repository with the code and the raw results, a write-up and a video.

| Feature | Result | Repository | Write-up | Video |
|---------|--------|------------|----------|-------|
| Empty test runs fail in sharded runs | A sharded run with zero matching tests went from all green to all red. Empty shards still pass. | [poc-playwright-empty-shards](https://github.com/qa-gary-parker/poc-playwright-empty-shards) | [Playwright 1.65: A Filter That Matches Nothing Now Fails Every Shard](https://garyparker.dev/blog/playwright-165-empty-shards) | [youtu.be/ooLV7mImlPY](https://youtu.be/ooLV7mImlPY) |
| `onlyFailures` reporter option | The JSON report went from 3.05 MB to 158 KB at 20 failed tests. The totals and the durations went with it. | [poc-playwright-reporter-size](https://github.com/qa-gary-parker/poc-playwright-reporter-size) | [Playwright 1.65 onlyFailures: Smaller Reports That Say Zero Tests Passed](https://garyparker.dev/blog/playwright-165-only-failures) | [youtu.be/eERuPGMcb6M](https://youtu.be/eERuPGMcb6M) |
| WebMCP tool calls | Playwright 1.65.1 called a page's WebMCP tools in 50 of 50 runs. Tools registered 50 ms late were missing from the first read. | [poc-playwright-webmcp](https://github.com/qa-gary-parker/poc-playwright-webmcp) | [Playwright WebMCP: Calls Pass 50 of 50, First Read Misses Late Tools](https://garyparker.dev/blog/playwright-webmcp) | [youtu.be/n3WWeNLxZds](https://youtu.be/n3WWeNLxZds) |

This directory has no spec file. Run each experiment from its own repository.

More experiments: [garyparker.dev/measured](https://garyparker.dev/measured)
