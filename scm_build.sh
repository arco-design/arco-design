#!/bin/sh

mkdir output_resource

rm -rf node_modules/

npm i @arco-design/static-pc-site@latest

mv node_modules/@arco-design/static-pc-site/dist/* output_resource/
