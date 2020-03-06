#!/usr/bin/env bash

function geekiest_method_queries_stun_server() {
  curl -s http://olegh.ftp.sh/public-stun.txt |
    grep -v '^#' | column -t -s: | shuf -n1 |
    ( read server port &&
      echo "Querying STUN server '$server' on port $port" &&
      echo -en '\x00\x01\x00\x08\xc0\x0c\xee\x42\x7c\x20\x25\xa3\x3f\x0f\xa1\x7f\xfd\x7f\x00\x00\x00\x03\x00\x04\x00\x00\x00\x00' |
      nc -u -w 2 "$server" "$port" |
      dd bs=1 count=4 skip=28 2>/dev/null |
      hexdump -e '1/1 "%u."' |
      sed 's/\.$/\n/' )
}

geekiest_method_queries_stun_server

