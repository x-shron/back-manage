# 打包脚本 jenkins执行

function info() {
    echo "============================================="
    echo "$1"
    echo "============================================="
}

# 依赖安装
echo "安装依赖..."
rm -rf yarn.lock
yarn
if [ $? -eq 0 ];then
    info "依赖安装成功"
else
    info "依赖安装失败"
    exit 1; 
fi


# 资源编译
echo '编译静态资源...'
npm run build
if [ $? -eq 0 ];then
    info "资源编译成功"
else
    info "资源编译失败"
    exit 1;
fi


PRJ_NAME=`cat package.json | grep '"name":' | awk -F: '{ print $2 }' | sed 's/[ ",]//g' | sed 's/.*\///g'`


# 打包 tar.gz
echo "打包资源..."
tar -zvcf ${PRJ_NAME}.tar.gz dist
if [ $? -eq 0 ];then
    info "打包成功"
else
    info "打包失败"
    exit 1;
fi

echo "生成部署脚本..."
yarn generate-deploy-scripts
if [ $? -eq 0 ];then
    info "生成部署脚本成功"
else
    info "生成部署脚本失败"
    exit 1;
fi