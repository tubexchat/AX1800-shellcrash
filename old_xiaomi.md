# 老旧版小米路由器的刷机

老旧版小米路由器是指WIFI6标准前的小米WIFI路由器，型号有4A、4C、3Gv2、4Q、3C这类型号。在刷入OpenWRT上通常通过[OpenWRTInvasion](https://github.com/acecilia/OpenWRTInvasion)脚本一键注入式刷机。

在下载完该项目包后：
```bash
pip3 install -r requirements.txt # Install requirements
python3 remote_command_execution_vulnerability.py # Run the script
```
进入刷机状态，刷机之前会让用户在命令行中填写路由器局域网地址，如：192.168.31.1，路由器密码和stok值。

> 注：stok值位于路由器网页url中。

刷机成功后，可以通过如下命令登录：
```bash
ssh -oKexAlgorithms=+diffie-hellman-group1-sha1 -oHostKeyAlgorithms=+ssh-rsa -c 3des-cbc -o UserKnownHostsFile=/dev/null root@192.168.31.1
# 密码为root
```
