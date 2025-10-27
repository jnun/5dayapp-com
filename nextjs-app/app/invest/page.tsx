'use client';

import { useState } from 'react';
import { Search, TrendingUp, Heart, Users, DollarSign, Clock, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import './invest.css';

interface Investment {
  id: string;
  name: string;
  tagline: string;
  category: string;
  raised: number;
  goal: number;
  investors: number;
  daysLeft: number;
  image: string;
  featured: boolean;
}

export default function InvestPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const investments: Investment[] = [
    {
      id: '1',
      name: 'Faith Forward Coffee',
      tagline: 'Community-centered coffee shops spreading hope',
      category: 'Food & Beverage',
      raised: 125000,
      goal: 250000,
      investors: 87,
      daysLeft: 18,
      image: '/placeholder-coffee.jpg',
      featured: true,
    },
    {
      id: '2',
      name: 'Kingdom Kids Learning',
      tagline: 'Christ-centered early childhood education platform',
      category: 'Education',
      raised: 89000,
      goal: 150000,
      investors: 52,
      daysLeft: 12,
      image: '/placeholder-education.jpg',
      featured: true,
    },
    {
      id: '3',
      name: 'Hope Restoration Services',
      tagline: 'Faith-based home renovation for those in need',
      category: 'Social Impact',
      raised: 45000,
      goal: 100000,
      investors: 34,
      daysLeft: 25,
      image: '/placeholder-restoration.jpg',
      featured: false,
    },
    {
      id: '4',
      name: 'Faithful Finance App',
      tagline: 'Biblical principles meet modern money management',
      category: 'Technology',
      raised: 178000,
      goal: 300000,
      investors: 143,
      daysLeft: 8,
      image: '/placeholder-finance.jpg',
      featured: true,
    },
  ];

  const categories = ['all', 'Food & Beverage', 'Education', 'Social Impact', 'Technology', 'Healthcare', 'Media'];

  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || inv.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredInvestments = filteredInvestments.filter(inv => inv.featured);

  return (
    <div className="invest-page">
      {/* Hero Section */}
      <section className="invest-hero">
        <div className="container">
          <div className="invest-hero-content">
            <h1>Find Your Next Faith-Powered Investment</h1>
            <p className="invest-hero-subtitle">
              Support mission-driven businesses that align with your values and build God&apos;s kingdom while earning returns.
            </p>

            {/* Search Bar */}
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by company name or mission..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <TrendingUp size={20} />
                <div>
                  <div className="stat-value">$12.4M</div>
                  <div className="stat-label">Total Raised</div>
                </div>
              </div>
              <div className="stat-item">
                <Users size={20} />
                <div>
                  <div className="stat-value">2,847</div>
                  <div className="stat-label">Investors</div>
                </div>
              </div>
              <div className="stat-item">
                <Heart size={20} />
                <div>
                  <div className="stat-value">156</div>
                  <div className="stat-label">Companies Funded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-header">
            <div className="filter-label">
              <Filter size={18} />
              <span>Filter by Category</span>
            </div>
          </div>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investments */}
      {featuredInvestments.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <h2 className="section-title">Featured Opportunities</h2>
            <div className="featured-grid">
              {featuredInvestments.map(investment => (
                <InvestmentCard key={investment.id} investment={investment} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Investments */}
      <section className="all-investments">
        <div className="container">
          <h2 className="section-title">
            {selectedCategory === 'all' ? 'All Opportunities' : `${selectedCategory} Opportunities`}
          </h2>
          <div className="investments-grid">
            {filteredInvestments.map(investment => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
          {filteredInvestments.length === 0 && (
            <div className="no-results">
              <p>No investments found matching your criteria.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function InvestmentCard({ investment, featured = false }: { investment: Investment; featured?: boolean }) {
  const percentRaised = (investment.raised / investment.goal) * 100;

  return (
    <Link href={`/invest/${investment.id}`} className={`investment-card ${featured ? 'featured-card' : ''}`}>
      <div className="investment-image">
        <div className="image-placeholder">
          <TrendingUp size={48} />
        </div>
        {featured && <div className="featured-badge">Featured</div>}
        <div className="category-badge">{investment.category}</div>
      </div>

      <div className="investment-content">
        <h3 className="investment-name">{investment.name}</h3>
        <p className="investment-tagline">{investment.tagline}</p>

        <div className="investment-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentRaised}%` }}></div>
          </div>
          <div className="progress-stats">
            <div className="progress-stat">
              <span className="stat-value">${(investment.raised / 1000).toFixed(0)}K</span>
              <span className="stat-label">raised of ${(investment.goal / 1000).toFixed(0)}K</span>
            </div>
            <div className="progress-percent">{percentRaised.toFixed(0)}%</div>
          </div>
        </div>

        <div className="investment-meta">
          <div className="meta-item">
            <Users size={16} />
            <span>{investment.investors} investors</span>
          </div>
          <div className="meta-item">
            <Clock size={16} />
            <span>{investment.daysLeft} days left</span>
          </div>
        </div>

        <div className="investment-cta">
          <span>View Details</span>
          <ChevronRight size={18} />
        </div>
      </div>
    </Link>
  );
}
