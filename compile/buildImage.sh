# Pre Check
echo Script name: $0
echo "build xdr_webui begin"

IMAGENAME="xdr_webui"
SRVPATH=$WORKSPACE"/xdrCode/xdr_mgmt/webui"


echo "========= docker $VERSION - $BUILD_NUMBER=========================="

whoami
# root

SRV_DELETE=$(docker image ls $IMAGENAME --format '{{.ID}}')
echo "$SRV_DELETE"
for line in $SRV_DELETE; do 
    echo "Delete Docker Image $IMAGENAME $line"
    docker image rm "$line" --force
done
#Dockerfile dir
cd "$SRVPATH" || exit

docker image build -t "$IMAGENAME":"$VERSION"."$BUILD_NUMBER" .
if [ $? -ne 0 ]; then
    echo "Docker schedule Failure"
    exit 1
fi
echo "build webui server end"

