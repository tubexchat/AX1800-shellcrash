# AX1800-shellcrash

本项目是一个硬件基于小米AX1800型号路由器，软件基于ShellCrash的指导性教程，旨在帮助国内小型互联网企业及外贸企业构建科学上网办公环境。

## 教程前提

1. 用户已经具备基础的科学上网知识，知晓V2ray、Clash、Shadowrocket等工具的使用；
2. 用户已经具备基础浏览器的JavaScript脚本知识；
3. 用户已经具备基础的Linux和路由器配置等知识，如SSH链接、Linux脚本的使用；
4. 用户已经拥有一台配置科学上网环境的计算机和一个靠谱的机场节点URL。

## AX1800路由器的降级

由于国内路由器受到政策影响，最新的路由器软件包已经不在允许用户自行通过SSH的方式连接路由器。所以首先需要对AX1800路由器降级到1.0.336版本以下。
点击进入小米路由器Web页面中：http://192.168.31.1/cgi-bin/luci/web。

<img src="/public/home.png" width=600/>

进入页面后选择**常用设置**/**系统状态**，点击**手动升级**，将本项目中[miwifi_rm1800_firmware_fafda_1.0.336.bin]()下载并上传上去。

<img src="/public/upgrade.png" width=600/>

所谓的升级本质是降级，在降级之后AX1800路由器会呈现黄蓝灯两种状态，原本连接的Wifi会被断开、WIFI的名称也会重置成Xiaomi_CCFB。重连该网络，重新进入[路由器配置页面](http://192.168.31.1/cgi-bin/luci/web)即可。如果重启后的路由器使用一切正常那么恭喜你AX1800降级成功。

## SSH的设置

降级成功之后，我们需要进行SSH的配置和登录。打开[路由器配置页面](http://192.168.31.1/cgi-bin/luci/web)的控制台，将本项目中的set_ssh.js脚本代码在浏览器console(控制台)中进行运行。运行成功后，会弹出密码设置，比如：admin

<img src="/public/set_ssh_secret.png" width=600/>
