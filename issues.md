# Issues 已知问题 

1. 甬哥Nat64 worker脚本无法访问TikTok和Gemini，原因是被识别出中国用户

2. bpb_obfs_pack.zip pages脚本无法访问Cloudflare网页

3. Shellcrash的生成`config.yaml`服务器全部瘫痪需要根据订阅节点的url手动生成

## Cloudflare翻墙原理解释

当一个设备（电脑或路由器）添加代理设置后，审查系统（如 GFW）在网络边界进行检测时，看到的只是从您的设备发出的、加密的、目标是 Cloudflare IP 的 HTTPS 流量。由于 Cloudflare 是全球最大的 CDN 和安全服务商，其 IP 承载着海量的合法流量，审查系统通常无法或不愿轻易封锁 Cloudflare 的 IP，这使得代理流量得以安全通过。以甬哥的nat64混淆代码为例，它提供了www.visa.com/cis.visa.com/africa.visa.com等13个与VISA相关的域名，看起来像是在访问一个全球性的、高度敏感的金融服务网站。最终通过Cloudflare CDN的边缘IP发出抵达最近的真实网站服务器。

由于是通过Cloudflare CDN的网络的边缘IP发出网络请求，但是由于大量的网站自身部署在Cloudflare，为防止循环请求这就导致在原生环境中部署在Cloudflare的代理无法访问部署在Cloudflare上的网页，如：cloudflare.com/javbus.com/x.com


## 清洁 IP

```bash
# 注意中国区使用需要先关梯子
./CloudflareScanner
```

<img src="/public/cleanip_shortcut.png" width=600/>


