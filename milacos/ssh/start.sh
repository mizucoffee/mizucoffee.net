#!/bin/bash

SSHPIPERD_BIN="$GOPATH/bin/sshpiperd"
BASEDIR="/ssh/"
LOGFILE="/ssh/log/sshpiperd.log"

if [ ! -f $BASEDIR/sshpiperd_key ];then
  ssh-keygen -N '' -f $BASEDIR/sshpiperd_key
fi

for u in `find $BASEDIR/config/ -name sshpiper_upstream`; do
  chmod 400 $u
  upstream=`cat $u`

  username=`dirname $u`
  username=`basename $username`
done
$SSHPIPERD_BIN -p 22 -i $BASEDIR/sshpiperd_key --workingdir $BASEDIR/config --log $LOGFILE
