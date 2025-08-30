# azure-load-balancer
Demo project using Azure Load Balancer with 2 VMs
# 🌐 Azure Load Balancer Demo 🚀

This project demonstrates how to set up an **Azure Load Balancer** with two Virtual Machines (VMs) running a sample Node.js app on port **3000**, accessible through the Load Balancer’s public IP on port **80**.  

---

## 🛠️ Project Overview
- 2 x Ubuntu Virtual Machines (VM1, VM2)
- Node.js web app running on **port 3000**
- Azure **Standard Load Balancer**
- Health Probe + Load Balancing Rule
- Round-robin traffic distribution

---

## 📂 Project Contents
- `app.js` → Simple Node.js app  
- `README.md` → Documentation (this file)  

---

## ⚡ Deployment Steps (Azure Portal)

1. **Create VMs**  
   - Region: East US (or any)  
   - Image: Ubuntu LTS  
   - Open inbound port: 3000  

2. **Install Node.js & App** (run on each VM)
   ```bash
   sudo apt update -y
   sudo apt install nodejs npm -y
   mkdir webapp && cd webapp
   nano app.js
