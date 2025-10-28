# AWS Infrastructure Costs - Evidence-Based Analysis (2025)

## Data Sources
All pricing data sourced from:
- AWS Official Pricing Pages (aws.amazon.com)
- Vantage.sh instance pricing database
- Economize.cloud AWS pricing calculator
- CloudChipr pricing guides (2025)

## Pricing Breakdown by Service (US East Region)

### **RDS PostgreSQL** (Single-AZ, On-Demand)
| Instance Type | vCPU | Memory | Hourly | Monthly (730h) |
|---------------|------|--------|--------|----------------|
| db.t4g.micro  | 2    | 1GB    | $0.016 | $11.68         |
| db.t4g.small  | 2    | 2GB    | $0.032 | $23.36         |
| db.t4g.medium | 2    | 4GB    | $0.065 | $47.45         |
| db.t4g.large  | 2    | 8GB    | $0.130 | $94.90         |
| db.r6g.large  | 2    | 16GB   | $0.225 | $164.25        |
| db.r6g.xlarge | 4    | 32GB   | $0.450 | $328.50        |

**Multi-AZ:** 2x the single-AZ price
**Storage:** $0.115/GB-month (gp3), $0.10/GB-month for backup storage

### **ElastiCache Redis**
| Instance Type   | vCPU | Memory | Hourly | Monthly (730h) |
|-----------------|------|--------|--------|----------------|
| cache.t4g.micro | 2    | 0.5GB  | $0.016 | $11.68         |
| cache.t4g.small | 2    | 1.37GB | $0.032 | $23.36         |
| cache.t4g.medium| 2    | 3.09GB | $0.065 | $47.45         |
| cache.r6g.large | 2    | 13GB   | $0.206 | $150.38        |
| cache.r6g.xlarge| 4    | 26GB   | $0.411 | $300.03        |

### **ECS Fargate** (Linux/x86)
- **vCPU:** $0.04048 per vCPU-hour
- **Memory:** $0.004445 per GB-hour
- **Example:** 1 task with 0.5 vCPU + 1GB memory = $0.02469/hour = $18.03/month

### **Application Load Balancer (ALB)**
- **Base:** $0.0225/hour = $16.43/month
- **LCU:** $0.008 per LCU-hour
- **Typical cost:** $18-25/month for low traffic

### **S3 Storage**
- **S3 Standard:** $0.023/GB-month (first 50TB)
- **S3 Glacier Deep Archive:** $0.00099/GB-month (~$1/TB/month)
  - **Best for:** 7-year SEC compliance retention
  - **Minimum storage:** 180 days

### **CloudFront CDN**
- **Data Transfer Out:** $0.085/GB (first 10TB/month)
- **HTTP/HTTPS Requests:** $0.0075 per 10,000 requests
- **Typical MVP cost:** $20-50/month

### **Compliance & Security Services**

**AWS CloudTrail:**
- First trail: FREE (management events to S3)
- Additional trails: $2.00 per 100,000 events
- CloudTrail Lake: $2.50/GB (7-year retention)

**AWS Config:**
- $0.003 per configuration item recorded
- $0.001 per evaluation (first 100K/month)
- Typical cost: $20-50/month for compliance tracking

**AWS WAF:**
- Web ACL: $5.00/month
- Rules: $1.00/month per rule
- Requests: $0.60 per 1M requests
- **Example:** 1 ACL + 10 rules + 5M requests = $5 + $10 + $3 = $18/month

**AWS Secrets Manager:**
- $0.40 per secret per month
- $0.05 per 10,000 API calls

---

## Environment Cost Breakdown

### **DEVELOPMENT ENVIRONMENT**
*Can be shut down after hours (50% uptime assumed)*

| Service | Specification | Monthly Cost |
|---------|--------------|--------------|
| **RDS PostgreSQL** | db.t4g.small (2 vCPU, 2GB) + snapshots | $12 |
| **ElastiCache Redis** | cache.t4g.micro | $6 |
| **ECS Fargate** | 2 tasks (0.5 vCPU, 1GB each) @ 50% uptime | $18 |
| **S3 Storage** | 10GB | $0.25 |
| **CloudWatch** | Basic monitoring | $10 |
| **Networking** | Minimal data transfer | $5 |
| | |
| **TOTAL DEV** | | **~$50-75/month** |

### **STAGING ENVIRONMENT**
*Production-like but smaller scale (always on)*

| Service | Specification | Monthly Cost |
|---------|--------------|--------------|
| **RDS PostgreSQL** | db.t4g.medium (2 vCPU, 4GB) + backups | $60 |
| **ElastiCache Redis** | cache.t4g.small | $24 |
| **ECS Fargate** | 4 tasks (0.5 vCPU, 1GB each) | $72 |
| **ALB** | Base + minimal LCU | $24 |
| **S3 Storage** | 50GB | $1.15 |
| **CloudWatch** | Basic monitoring + alarms | $30 |
| **CloudTrail** | Minimal event tracking | $5 |
| **Networking** | Data transfer | $15 |
| | |
| **TOTAL STAGING** | | **~$230-250/month** |

### **PRODUCTION ENVIRONMENT - MVP LAUNCH (0-10K Users)**
*With PCI/SOC 2 compliance requirements*

| Service | Specification | Monthly Cost |
|---------|--------------|--------------|
| **RDS PostgreSQL** | db.t4g.large Multi-AZ (2 vCPU, 8GB) | $190 |
| **Storage (RDS)** | 100GB gp3 + backups | $25 |
| **ElastiCache Redis** | cache.t4g.medium | $48 |
| **ECS Fargate** | 6 tasks (0.5 vCPU, 1GB each, 24/7) | $108 |
| **ALB** | Base + moderate LCU | $26 |
| **S3 Standard** | 100GB active storage | $2.30 |
| **S3 Glacier Deep Archive** | 500GB (7-year compliance) | $0.50 |
| **CloudFront CDN** | Light traffic (1TB/month) | $50 |
| **CloudWatch** | Detailed monitoring + dashboards | $50 |
| **CloudTrail** | Audit logging (compliance) | $20 |
| **AWS Config** | Compliance tracking | $30 |
| **AWS WAF** | 1 ACL + 10 rules + 10M requests | $21 |
| **Secrets Manager** | 5 secrets | $2 |
| **VPC/Networking** | NAT Gateway + data transfer | $40 |
| **Third-Party APIs** | Plaid + DocuSign + Stripe (low vol) | $200 |
| **Blockchain Service** | Enterprise ledger (estimate) | $150 |
| **SendGrid + Twilio** | Email + SMS (low volume) | $50 |
| | |
| **TOTAL PRODUCTION (MVP)** | | **~$1,000-1,100/month** |

---

## TOTAL INFRASTRUCTURE COST (ALL ENVIRONMENTS)

### **Three Environment Strategy**

**Development Environment:**
- Purpose: Very light environment for code qualification experiments
- Characteristics: Can be shut down after hours, minimal resources
- Cost: $50-75/month

**Staging Environment:**
- Purpose: Light but designed to completely mimic production for testing deployments
- Characteristics: Always on, production-like configuration at smaller scale
- Cost: $230-250/month

**Production Environment:**
- Purpose: Full-blown system with redundancy and layers of uptime and security protection
- Characteristics: Multi-AZ, compliance, monitoring, full security stack
- Cost: $1,000-1,100/month (MVP)

| Environment | Monthly Cost |
|-------------|--------------|
| Development | $50-75 |
| Staging | $230-250 |
| Production (MVP) | $1,000-1,100 |
| | |
| **TOTAL** | **~$1,280-1,425/month** |

### **Optional: Advanced DDoS Protection**

**CloudFlare Enterprise or Similar:**
- Cost: ~$40,000/year (~$3,333/month)
- Purpose: Advanced DDoS protection for high-profile exposure
- Note: **NOT required for MVP** - AWS Shield Standard + CloudFront WAF provides baseline protection
- Recommendation: Add only when exposure increases or under active threat

**Total with Advanced DDoS:** $1,280-1,425/month + $3,333/month = **~$4,600-4,800/month**

**Verdict:** Likely unnecessary expense. Start with AWS-native protection, add only if needed.

---

## Production Scaling Path (Evidence-Based)

### **Early Growth (10K-100K Users)**
| Change | New Cost | Total |
|--------|----------|-------|
| Upgrade RDS to db.r6g.large Multi-AZ | +$140 | $330 |
| Add RDS read replica (optional) | +$165 | $495 |
| Scale to 8 Fargate tasks | +$36 | $144 |
| Upgrade Redis to cache.r6g.large | +$103 | $151 |
| Increase CloudFront (5TB/month) | +$150 | $200 |
| Higher API costs (moderate volume) | +$300 | $500 |
| | **TOTAL** | **~$2,000-2,500/month** |

### **Scale Phase (100K-1M Users)**
| Change | New Cost | Total |
|--------|----------|-------|
| Upgrade RDS to db.r6g.xlarge Multi-AZ | +$164 | $657 |
| Add 2 read replicas | +$328 | $985 |
| Scale to 12 Fargate tasks | +$72 | $216 |
| Upgrade Redis cluster (3 nodes) | +$100 | $251 |
| Increase CloudFront (20TB/month) | +$800 | $1,000 |
| Higher API costs (high volume) | +$700 | $1,200 |
| Datadog APM monitoring | +$300 | $350 |
| | **TOTAL** | **~$5,000-6,000/month** |

### **High Volume (1M+ Sustained Users)**
| Change | New Cost | Total |
|--------|----------|-------|
| Upgrade RDS to db.r6g.2xlarge Multi-AZ | +$328 | $1,313 |
| Add 3 read replicas | +$328 | $1,641 |
| Scale to 20 Fargate tasks | +$144 | $360 |
| Upgrade Redis cluster (5 nodes) | +$200 | $451 |
| Increase CloudFront (50TB/month) | +$2,000 | $3,000 |
| Multi-region setup (DR) | +$2,000 | $2,000 |
| Higher API costs (enterprise volume) | +$1,800 | $3,000 |
| Enhanced monitoring (Datadog, Sentry) | +$250 | $600 |
| | **TOTAL** | **~$12,000-15,000/month** |

---

## Key Insights

### **My Original Estimate Was Low for Full Compliance**

**Original MVP Estimate:** $500-1,000/month (production only)
**Evidence-Based Reality:** $1,000-1,100/month (production with compliance)
**With Dev + Staging:** $1,280-1,425/month (all environments)

### **Why the Difference?**

1. **Multi-AZ RDS (Production requirement):** Doubles database cost for HA
2. **Compliance overhead:** CloudTrail, AWS Config, WAF adds $70-80/month
3. **S3 Glacier retention:** SEC 7-year requirement adds minimal cost ($0.50/month)
4. **Third-party APIs:** Plaid + DocuSign + Blockchain adds $400/month
5. **Proper monitoring:** CloudWatch, alarms, dashboards adds $50/month

### **However, Your Scaling Intuition Was Correct**

**At 1M+ users:** $12-15K/month (not $75-150K as originally stated)

The key insight: **Horizontal scaling with stateless architecture prevents exponential cost growth.**

- Most traffic is cacheable (CloudFront CDN)
- Fargate scales linearly, not exponentially
- Database read replicas handle read traffic efficiently
- Transactions are temporary, not sustained

---

## Revised Recommendations

### **For MVP Launch (Realistic Budget)**

**Monthly Infrastructure:**
- All 3 environments: **$1,300-1,500/month**
- Production only: **$1,000-1,200/month**

**At Scale (1M+ users):**
- All 3 environments: **$12,000-15,000/month**
- Production only: **$10,000-12,000/month**

**Maximum realistic ceiling:** $15-20K/month for multi-million sustained users with dense content.

Your intuition was correct: lateral architecture scales efficiently without exponential cost increases.

---

## Sources & References

- AWS RDS Pricing: https://aws.amazon.com/rds/postgresql/pricing/
- AWS ECS Fargate Pricing: https://aws.amazon.com/fargate/pricing/
- AWS ElastiCache Pricing: https://aws.amazon.com/elasticache/pricing/
- AWS CloudTrail Pricing: https://aws.amazon.com/cloudtrail/pricing/
- AWS S3 Glacier: https://aws.amazon.com/s3/storage-classes/glacier/
- Vantage.sh Instance Database: https://instances.vantage.sh/
- CloudChipr 2025 Pricing Guides: https://cloudchipr.com/blog/
