import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    User,
    Briefcase,
    FileText,
    MessageSquare,
    Calendar,
    Download,
    Settings,
    LogOut,
    BarChart3,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ClientDashboardPage = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data for demonstration
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Website',
            status: 'In Progress',
            progress: 75,
            dueDate: '2024-12-15',
            lastUpdate: '2024-11-20'
        },
        {
            id: 2,
            title: 'Mobile App Development',
            status: 'Review',
            progress: 90,
            dueDate: '2024-11-30',
            lastUpdate: '2024-11-25'
        }
    ];

    const recentMessages = [
        {
            id: 1,
            from: 'Project Manager',
            subject: 'Project Update - E-Commerce Website',
            date: '2024-11-25',
            unread: true
        },
        {
            id: 2,
            from: 'Designer',
            subject: 'Design Mockups Ready for Review',
            date: '2024-11-24',
            unread: false
        }
    ];

    const handleLogout = () => {
        logout();
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'text-green-400';
            case 'in progress':
                return 'text-blue-400';
            case 'review':
                return 'text-yellow-400';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <CheckCircle size={16} className="text-green-400" />;
            case 'in progress':
                return <Clock size={16} className="text-blue-400" />;
            case 'review':
                return <AlertCircle size={16} className="text-yellow-400" />;
            default:
                return <Clock size={16} className="text-gray-400" />;
        }
    };

    return (
        <div className="client-dashboard-page">
            <div className="container">
                {/* Header */}
                <motion.header
                    className="dashboard-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="header-content">
                        <div className="user-info">
                            <div className="user-avatar">
                                <User size={24} />
                            </div>
                            <div className="user-details">
                                <h1>Welcome back, {user?.name || user?.email || 'Client'}!</h1>
                                <p>Manage your projects and account</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </motion.header>

                {/* Navigation Tabs */}
                <motion.nav
                    className="dashboard-nav"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {[
                        { id: 'overview', label: 'Overview', icon: BarChart3 },
                        { id: 'projects', label: 'Projects', icon: Briefcase },
                        { id: 'messages', label: 'Messages', icon: MessageSquare },
                        { id: 'files', label: 'Files', icon: Download },
                        { id: 'settings', label: 'Settings', icon: Settings }
                    ].map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <IconComponent size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </motion.nav>

                {/* Content Area */}
                <motion.main
                    className="dashboard-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {activeTab === 'overview' && (
                        <div className="overview-section">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <Briefcase size={24} />
                                    <div className="stat-info">
                                        <h3>{projects.length}</h3>
                                        <p>Active Projects</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <MessageSquare size={24} />
                                    <div className="stat-info">
                                        <h3>{recentMessages.filter(m => m.unread).length}</h3>
                                        <p>Unread Messages</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <FileText size={24} />
                                    <div className="stat-info">
                                        <h3>12</h3>
                                        <p>Files Available</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <Calendar size={24} />
                                    <div className="stat-info">
                                        <h3>3</h3>
                                        <p>Upcoming Deadlines</p>
                                    </div>
                                </div>
                            </div>

                            <div className="recent-activity">
                                <h2>Recent Projects</h2>
                                <div className="projects-list">
                                    {projects.map((project) => (
                                        <div key={project.id} className="project-card">
                                            <div className="project-header">
                                                <h4>{project.title}</h4>
                                                <div className={`project-status ${getStatusColor(project.status)}`}>
                                                    {getStatusIcon(project.status)}
                                                    <span>{project.status}</span>
                                                </div>
                                            </div>
                                            <div className="project-progress">
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="progress-text">{project.progress}%</span>
                                            </div>
                                            <div className="project-meta">
                                                <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                                                <span>Last Update: {new Date(project.lastUpdate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="projects-section">
                            <h2>Your Projects</h2>
                            <div className="projects-grid">
                                {projects.map((project) => (
                                    <div key={project.id} className="project-detail-card">
                                        <div className="project-header">
                                            <h3>{project.title}</h3>
                                            <div className={`project-status ${getStatusColor(project.status)}`}>
                                                {getStatusIcon(project.status)}
                                                <span>{project.status}</span>
                                            </div>
                                        </div>
                                        <div className="project-content">
                                            <div className="project-progress">
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="progress-text">{project.progress}% Complete</span>
                                            </div>
                                            <div className="project-details">
                                                <div className="detail-item">
                                                    <Calendar size={16} />
                                                    <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <Clock size={16} />
                                                    <span>Last Update: {new Date(project.lastUpdate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-actions">
                                            <button className="action-btn primary">View Details</button>
                                            <button className="action-btn secondary">Contact Team</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="messages-section">
                            <h2>Messages</h2>
                            <div className="messages-list">
                                {recentMessages.map((message) => (
                                    <div key={message.id} className={`message-card ${message.unread ? 'unread' : ''}`}>
                                        <div className="message-header">
                                            <div className="message-sender">
                                                <strong>{message.from}</strong>
                                                {message.unread && <span className="unread-indicator"></span>}
                                            </div>
                                            <span className="message-date">{new Date(message.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="message-subject">{message.subject}</div>
                                        <div className="message-actions">
                                            <button className="message-btn">Read</button>
                                            <button className="message-btn">Reply</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'files' && (
                        <div className="files-section">
                            <h2>Project Files</h2>
                            <div className="files-grid">
                                {[
                                    { name: 'Project Proposal.pdf', size: '2.4 MB', date: '2024-11-20' },
                                    { name: 'Design Mockups.zip', size: '15.7 MB', date: '2024-11-18' },
                                    { name: 'Requirements Document.docx', size: '1.2 MB', date: '2024-11-15' },
                                    { name: 'Wireframes.fig', size: '8.9 MB', date: '2024-11-12' }
                                ].map((file, index) => (
                                    <div key={index} className="file-card">
                                        <div className="file-icon">
                                            <FileText size={24} />
                                        </div>
                                        <div className="file-info">
                                            <h4>{file.name}</h4>
                                            <div className="file-meta">
                                                <span>{file.size}</span>
                                                <span>{new Date(file.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <button className="download-btn">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="settings-section">
                            <h2>Account Settings</h2>
                            <div className="settings-grid">
                                <div className="setting-card">
                                    <h3>Profile Information</h3>
                                    <div className="setting-item">
                                        <label>Name:</label>
                                        <span>{user?.name || 'Not set'}</span>
                                    </div>
                                    <div className="setting-item">
                                        <label>Email:</label>
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="setting-item">
                                        <label>Company:</label>
                                        <span>{user?.company || 'Not set'}</span>
                                    </div>
                                    <button className="setting-btn">Edit Profile</button>
                                </div>

                                <div className="setting-card">
                                    <h3>Notifications</h3>
                                    <div className="setting-item">
                                        <label>Email Notifications:</label>
                                        <input type="checkbox" defaultChecked />
                                    </div>
                                    <div className="setting-item">
                                        <label>Project Updates:</label>
                                        <input type="checkbox" defaultChecked />
                                    </div>
                                    <div className="setting-item">
                                        <label>Marketing Emails:</label>
                                        <input type="checkbox" />
                                    </div>
                                    <button className="setting-btn">Save Preferences</button>
                                </div>

                                <div className="setting-card">
                                    <h3>Security</h3>
                                    <button className="setting-btn danger">Change Password</button>
                                    <button className="setting-btn">Enable 2FA</button>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.main>
            </div>

            <style jsx>{`
        .client-dashboard-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .dashboard-header {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-avatar {
          width: 60px;
          height: 60px;
          background: rgba(0, 245, 255, 0.1);
          border: 2px solid rgba(0, 245, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00f5ff;
        }

        .user-details h1 {
          font-size: 2rem;
          margin-bottom: 5px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .user-details p {
          color: #b0b0b0;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .dashboard-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .nav-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 25px;
          color: #b0b0b0;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nav-tab:hover,
        .nav-tab.active {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.5);
          color: #00f5ff;
        }

        .dashboard-content {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(0, 245, 255, 0.3);
          transform: translateY(-5px);
        }

        .stat-card svg {
          color: #00f5ff;
        }

        .stat-info h3 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 5px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-info p {
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .recent-activity h2,
        .projects-section h2,
        .messages-section h2,
        .files-section h2,
        .settings-section h2 {
          font-size: 1.8rem;
          margin-bottom: 30px;
          color: #ffffff;
        }

        .projects-list,
        .messages-list,
        .files-grid,
        .settings-grid {
          display: grid;
          gap: 20px;
        }

        .project-card,
        .message-card,
        .file-card {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          transition: all 0.3s ease;
        }

        .project-card:hover,
        .message-card:hover,
        .file-card:hover {
          border-color: rgba(0, 245, 255, 0.3);
          transform: translateY(-2px);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .project-header h4 {
          font-size: 1.2rem;
          color: #ffffff;
        }

        .project-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          color: #b0b0b0;
        }

        .project-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #888;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
        }

        .project-detail-card {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 15px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .project-detail-card:hover {
          border-color: rgba(0, 245, 255, 0.3);
          transform: translateY(-5px);
        }

        .project-content {
          margin: 20px 0;
        }

        .project-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .project-actions {
          display: flex;
          gap: 15px;
        }

        .action-btn {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
        }

        .action-btn.secondary {
          background: transparent;
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .message-sender {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .unread-indicator {
          width: 8px;
          height: 8px;
          background: #00f5ff;
          border-radius: 50%;
        }

        .message-date {
          color: #888;
          font-size: 0.9rem;
        }

        .message-subject {
          color: #ffffff;
          margin-bottom: 15px;
        }

        .message-actions {
          display: flex;
          gap: 10px;
        }

        .message-btn {
          padding: 8px 16px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .message-btn:hover {
          background: rgba(0, 245, 255, 0.2);
        }

        .files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .file-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
        }

        .file-icon {
          color: #00f5ff;
        }

        .file-info h4 {
          color: #ffffff;
          margin-bottom: 5px;
        }

        .file-meta {
          display: flex;
          gap: 15px;
          font-size: 0.8rem;
          color: #888;
        }

        .download-btn {
          margin-left: auto;
          padding: 8px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .download-btn:hover {
          background: rgba(0, 245, 255, 0.2);
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .setting-card {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
        }

        .setting-card h3 {
          color: #ffffff;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .setting-item:last-child {
          border-bottom: none;
          margin-bottom: 25px;
        }

        .setting-item label {
          color: #b0b0b0;
          font-weight: 500;
        }

        .setting-item span {
          color: #ffffff;
        }

        .setting-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
        }

        .setting-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 10px;
        }

        .setting-btn:last-child {
          margin-bottom: 0;
        }

        .setting-btn {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
        }

        .setting-btn.danger {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .setting-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.3);
        }

        .setting-btn.danger:hover {
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        @media (max-width: 768px) {
          .client-dashboard-page {
            padding: 80px 0 60px;
          }

          .container {
            padding: 0 15px;
          }

          .header-content {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .dashboard-nav {
            justify-content: center;
          }

          .nav-tab {
            padding: 10px 16px;
            font-size: 0.9rem;
          }

          .dashboard-content {
            padding: 25px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .files-grid {
            grid-template-columns: 1fr;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }

          .project-actions {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
};

export default ClientDashboardPage;