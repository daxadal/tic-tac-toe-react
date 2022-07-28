# Exit if any command fails
set -e

echo "Deploy $CI_COMMIT_REF_NAME. Triggered by $CI_PIPELINE_SOURCE"
chmod 400 key.pem

echo " === Creating directory... === "
ssh -o StrictHostKeyChecking=no -i key.pem $SERVER_USER@$SERVER_IP \
  "mkdir $SERVER_LOCATION -p"

echo " === Starting secure copy... === "
rsync -e "ssh -o StrictHostKeyChecking=no -i key.pem" -r \
  build package.json $SERVER_USER@$SERVER_IP:$SERVER_LOCATION
