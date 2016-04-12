==On the router:
1. Enable DNSMasq
2. Add rule 'address=/#/192.168.1.100'

==On the server:
1. Forward port 80 to port 8080 using pf
  1. file `/etc/pf.anchors/bsod`: `rdr pass on lo0 inet proto tcp from any to self port 80 -> 127.0.0.1 port 8080`
  2. file `/etc/pf.conf`: 
```
rdr-anchor "forwarding"
load anchor "forwarding" from "/etc/pf.anchors/bsod"
```
  3. Enable pf: `sudo pfctl -ef /etc/pf.anchors/bsod`
  4. To disable: `sudo pfctl -d`
2. Run server with `npm start`

==Oooooor (security be damned):
1. Set PORT=80 in index.js
2. Run server with `sudo npm start`
3. Get hacked

==In VLC (to enable crash stutter)
1. Preferences > Show All
2. Interface > Main Interfaces > RC
3. UNIX socket command input = `/Users/vlc/vlc.sock`


