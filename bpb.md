# BPB Panel 配置

## BPB面板设置

点击https://[域名]/panel，

<img src="/public/vless.png" width=600/>

<img src="/public/routing_rules.png" width=600/>


## Cloudflare IP扫描

打开[](https://www.nslookup.io/domains/cdn.xn--b6gac.eu.org/dns-records/)页面，找到一个反向代理域名；

打开[cf-ip-scanner](https://vfarid.github.io/cf-ip-scanner),（需要科学上网，登录后关掉VPN）找到一个干净IP

## Cloudflare Proxy IP失效问题

BPB Panel 科学上网的本质是Cloudflare的Worker项目，由于Cloudflare为防止出现在CDN环境中循环访问，禁止Worker项目访问其他托管到Cloudflare上的网站。这就使得原生的BPB Panel的IP会无法访问如推特这类网站。为解决这一问题，BPB Panel提出了通过Proxy IP的方式进行反向代理访问。

<img src="/public/cf_worker.png" width=600/>
<img src="/public/cf_worker_banned.png" width=600/>
<img src="/public/cf_proxy.png" width=600/>

https://www.youtube.com/watch?v=2i3lu_kdJrQ

---

参考资料：https://www.iyio.net/2025/04/111332.html