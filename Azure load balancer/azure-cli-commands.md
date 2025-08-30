# Variables
RESOURCE_GROUP=lb-demo-rg
LOCATION=eastus
LB_NAME=web-lb
FRONTEND_NAME=web-frontend
BACKEND_POOL=web-backend
PROBE_NAME=web-probe
RULE_NAME=http-rule
VM1=web-vm1
VM2=web-vm2

# 1. Create Resource Group
az group create --name $RESOURCE_GROUP --location $LOCATION

# 2. Create VMs (sample)
az vm create \
  --resource-group $RESOURCE_GROUP \
  --name $VM1 \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys \
  --custom-data cloud-init.txt

az vm create \
  --resource-group $RESOURCE_GROUP \
  --name $VM2 \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys \
  --custom-data cloud-init.txt

# 3. Create Public IP for LB
az network public-ip create \
  --resource-group $RESOURCE_GROUP \
  --name web-lb-ip \
  --sku Standard

# 4. Create Load Balancer
az network lb create \
  --resource-group $RESOURCE_GROUP \
  --name $LB_NAME \
  --sku Standard \
  --frontend-ip-name $FRONTEND_NAME \
  --backend-pool-name $BACKEND_POOL \
  --public-ip-address web-lb-ip

# 5. Add Health Probe
az network lb probe create \
  --resource-group $RESOURCE_GROUP \
  --lb-name $LB_NAME \
  --name $PROBE_NAME \
  --protocol Tcp \
  --port 3000

# 6. Create LB Rule
az network lb rule create \
  --resource-group $RESOURCE_GROUP \
  --lb-name $LB_NAME \
  --name $RULE_NAME \
  --protocol Tcp \
  --frontend-port 80 \
  --backend-port 3000 \
  --frontend-ip-name $FRONTEND_NAME \
  --backend-pool-name $BACKEND_POOL \
  --probe-name $PROBE_NAME

# 7. Add VMs to Backend Pool
az network nic ip-config address-pool add \
  --address-pool $BACKEND_POOL \
  --ip-config-name ipconfig1 \
  --nic-name ${VM1}VMNic \
  --resource-group $RESOURCE_GROUP \
  --lb-name $LB_NAME

az network nic ip-config address-pool add \
  --address-pool $BACKEND_POOL \
  --ip-config-name ipconfig1 \
  --nic-name ${VM2}VMNic \
  --resource-group $RESOURCE_GROUP \
  --lb-name $LB_NAME
