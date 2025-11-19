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

进入页面后选择**常用设置**/**系统状态**，点击**手动升级**，将本项目中[miwifi_rm1800_firmware_fafda_1.0.336.bin](https://github.com/tubexchat/AX1800-shellcrash/blob/main/files/miwifi_rm1800_firmware_fafda_1.0.336.bin)下载并上传上去。

<img src="/public/upgrade.png" width=600/>

所谓的升级本质是降级，在降级之后AX1800路由器会呈现黄蓝灯两种状态，原本连接的Wifi会被断开、WIFI的名称也会重置成Xiaomi_CCFB。重连该网络，重新进入[路由器配置页面](http://192.168.31.1/cgi-bin/luci/web)即可。如果重启后的路由器使用一切正常那么恭喜你AX1800降级成功。

## SSH的设置

降级成功之后，我们需要进行SSH的配置和登录。打开[路由器配置页面](http://192.168.31.1/cgi-bin/luci/web)的控制台，将本项目中的set_ssh.js脚本代码在浏览器console(控制台)中进行运行。运行成功后，会弹出密码设置，比如：admin

<img src="/public/set_ssh_secret.png" width=600/>

接着我们在本地计算机的终端上通过SSH连接小米AX1800路由器：

```bash
ssh -o HostKeyAlgorithms=+ssh-rsa root@192.168.31.1
```

> 注: 为什么不直接使用ssh root@192.168.31.1，因为现有的终端已经升级加密算法，需要指定ssh-rsa

在进入路由器环境之后，我们会发现这就是一个OpenWrt版本的Linux环境。为了后续加载源文件和配置文件上保持网络畅通，我们给首先给这个嵌入式Linux环境配置好临时的终端科学上网环境。我们这里以ShadowRocket为例。

在**设置/代理**页面中找到我们科学上网的代理端口(如：1082)

<img src="/public/shadowrocket.png" width=600/>

然后在本机终端中执行：

```bash
ifconfig | grep "inet "
```

找到局域网内本地IP地址：

<img src="/public/local_ip.png" width=600/>

> 如：192.168.31.167

在AX1800路由器环境的终端中设置http/https代理环境变量执行如下：

```bash
# 设置您的本机IP和代理端口，以下仅为DEMO
export http_proxy="http://192.168.31.167:1082"
export https_proxy="http://192.168.31.167:1082"
```

设置后可以测试下是否可以使用Google：

```bash
curl -v google.com
```

到了这里有关于AX1800硬件环境的配置就大功告成了，接下来进入本教程的核心环节ShellCrash的安装与配置

## ShellCrash的安装与配置

[ShellCrash](https://github.com/juewuy/ShellCrash) 原名ShellClash是著名的科学上网工具，类似于 Passwall、OpenClash 等，但是区别在于，从名字可以看出，它是基于 Shell 脚本实现的，并没有图形界面。是目前最为流行的软路由工具之一。有关于该项目可以在Github上自行查询。

### 脚本安装

在OpenWrt系统环境中运行以下任意安装脚本：

```bash
#GitHub源(可能需要代理)
export url='https://raw.githubusercontent.com/juewuy/ShellCrash/master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
#jsDelivrCDN源
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellCrash@master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
#作者私人源
export url='https://gh.jwsc.eu.org/master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
#GitHub源(可能需要代理)
export url='https://raw.githubusercontent.com/juewuy/ShellCrash/master' && wget -q --no-check-certificate -O /tmp/install.sh $url/install.sh  && sh /tmp/install.sh && source /etc/profile &> /dev/null
```

<img src="/public/install.png" width=600/>

### 脚本配置

运行脚本`crash`,我们依次按图进行配置：

<img src="/public/configuration_1.png" width=600/>

<img src="/public/configuration_2.png" width=600/>

在这里我们需要着重讲的是**在线生成配置文件**这一项，首先你需要输入您的订阅节点的URL，这个至关重要不是你的vmess URL切记。这个订阅节点可以是您花钱买的，也可是是您自己通过BPB Panel创建的Cloudflare节点。

## UI端管理

```bash
crash
```
<img src="/public/dashboard_install.png" width=600/>

打开http://192.168.31.1:9999/ui

<img src="/public/dashboard.png" width=600/>

目前我使用Cloudflare CDN搭建了一个16K的[BPB Panel](https://github.com/tubexchat/AX1800-shellcrash/blob/main/bpb.md)私人通道，最终效果如下：

<img src="/public/screen.png" width=600/>

## FQA

1.  指纹报错
   ```bash ssh -o HostKeyAlgorithms=+ssh-rsa root@192.168.31.1
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:2Xi64sJhqfWjHsg9Jk1QbS9YyuipP1LEjaXGzMznoHQ.
Please contact your system administrator.
Add correct host key in /Users/lewiszhang/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/lewiszhang/.ssh/known_hosts:112
Host key for 192.168.31.1 has changed and you have requested strict checking.
Host key verification failed.```

答：这是由于本机指纹不对，可以删除后再次登录：

```bash
ssh-keygen -R 192.168.31.1
```

2. CDN服务是否正常运行

答：可以通过打开http://192.168.31.1:9999/ui/

进行验证，如果不能进入可以进入路由器中，运行`crash`，然后选择1重启即可。

