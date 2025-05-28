import Bookscounter from '@/components/Home/Bookscounter';
import MySwiperComponent from '@/components/Home/MySwiperComponent';
import Layout from '@/components/layouts/Layout';
import FatawaRec from '@/components/Recommended/FatawaRec';
import { FatchGetfatawahWithCate, PageGetfatawah_master } from '@/services/Manage_services';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Fatawa {
    fatawah_master_MID: number;
    fatawah_title: string;
    fatawah_description: string;
    Created_Date: string;
    RefNo: string;
    MID: number;
}

interface FatawaMaster {
    MID: number;
    title: string;
}

const FatawaPage: React.FC = () => {
    const [latestFatawa, setLatestFatawa] = useState<Fatawa[]>([]);
    const [fatawahMaster, setFatawahMaster] = useState<FatawaMaster[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>('All');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const fetchLatestFatawa = async (category: string) => {
        try {
            const response = await FatchGetfatawahWithCate(category);
            if (response?.statusCode === 200) {
                setLatestFatawa(response.data);
                setCurrentPage(1); // reset to first page
            } else {
                toast.error('Failed to fetch fatawa.');
            }
        } catch (error) {
            console.error('Error fetching fatawa:', error);
            toast.error('Error fetching fatawa.');
        }
    };

    const fetchFatawahMaster = async () => {
        try {
            const response = await PageGetfatawah_master();
            if (response?.statusCode === 200) {
                setFatawahMaster(response.data);
            } else {
                toast.error('Failed to fetch fatawah master.');
            }
        } catch (error) {
            console.error('Error fetching fatawah master:', error);
            toast.error('Error fetching fatawah master.');
        }
    };

    const handleTabClick = async (category: string) => {
        setSelectedTab(category);
        await fetchLatestFatawa(category);
        setIsMobileMenuOpen(false); // Close mobile menu after tab click
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        fetchLatestFatawa('All');
        fetchFatawahMaster();
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = latestFatawa.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(latestFatawa.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const visiblePages = [];
        const totalNumbers = 8;
        const half = Math.floor(totalNumbers / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (start > 1) {
            visiblePages.push(
                <button key={1} onClick={() => paginate(1)} className="page-link">1</button>
            );
            if (start > 2) visiblePages.push(<span key="start-ellipsis">...</span>);
        }

        for (let i = start; i <= end; i++) {
            visiblePages.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`page-link ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (end < totalPages) {
            if (end < totalPages - 1) visiblePages.push(<span key="end-ellipsis">...</span>);
            visiblePages.push(
                <button key={totalPages} onClick={() => paginate(totalPages)} className="page-link">
                    {totalPages}
                </button>
            );
        }

        return visiblePages;
    };

    return (
        <Layout>
            <div>
                <section className="pt-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-10">
                                <div className="guiding-light pb-3">
                                    <h2 style={{ color: '#008B11', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '700' }}>Guiding Light of Fatawa</h2>
                                    <p>
                                        Discover reliable, faith-centered answers on daily issues, grounded in Sunni values,
                                        shaping and enriching Muslim lives.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-2 d-flex d-lg-block justify-content-end mb-3 mb-lg-0">
                                <div className="ask-fatawa">
                                    <Link href="/AskFatawa">
                                        <button
                                            className="btn btn-view me-2"
                                            style={{ color: 'white', background: '#008B11', fontSize: '14px' }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="40"
                                                height="30"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M9.99995 2C5.75495 2 2.19995 5.048 2.19995 8.9C2.19995 10.718 3.01535 12.3488 4.29995 13.5686C4.14376 13.9768 3.92205 14.3568 3.64355 14.6936C3.27443 15.1413 2.86666 15.5557 2.42495 15.932C2.32806 16.0097 2.25769 16.1156 2.22354 16.2351C2.18939 16.3545 2.19315 16.4816 2.2343 16.5988C2.27546 16.716 2.35197 16.8175 2.45329 16.8894C2.55461 16.9613 2.67573 16.9999 2.79995 17C4.12895 17 5.08475 16.985 5.94995 16.7564C6.72395 16.5512 7.38935 16.1216 8.06855 15.5186C8.68655 15.6668 9.32435 15.8 9.99995 15.8C14.245 15.8 17.8 12.752 17.8 8.9C17.8 5.048 14.245 2 9.99995 2ZM9.99995 3.2C13.675 3.2 16.6 5.792 16.6 8.9C16.6 12.008 13.675 14.6 9.99995 14.6C9.34655 14.6 8.66795 14.4872 8.04995 14.3186C7.95112 14.2938 7.8476 14.2945 7.74913 14.3207C7.65066 14.347 7.5605 14.3979 7.48715 14.4686C6.81215 15.116 6.31475 15.4178 5.64995 15.5936C5.34395 15.6746 4.75355 15.6554 4.33715 15.6878C4.42115 15.593 4.49975 15.5426 4.58135 15.4436C5.05295 14.8676 5.48315 14.2586 5.61275 13.5686C5.6306 13.465 5.62093 13.3586 5.58471 13.2599C5.54849 13.1612 5.48698 13.0738 5.40635 13.0064C4.14935 11.9684 3.39995 10.5134 3.39995 8.9C3.39995 5.792 6.32495 3.2 9.99995 3.2ZM8.85635 5.5436C8.75074 5.5673 8.6535 5.61913 8.57495 5.6936L7.67495 6.5378L8.48135 7.4186L9.19355 6.7436H10.6372L11.2 7.382V8.2634L9.66215 9.2942C9.57995 9.35018 9.51296 9.4257 9.46719 9.51399C9.42142 9.60228 9.39832 9.70057 9.39995 9.8V11H10.6V10.1372L12.1378 9.1064C12.22 9.05037 12.2871 8.97474 12.3329 8.88634C12.3786 8.79794 12.4017 8.69954 12.4 8.6V7.1564C12.3992 7.01138 12.3459 6.87156 12.25 6.7628L11.35 5.75C11.2939 5.68556 11.2248 5.63382 11.1472 5.59822C11.0696 5.56263 10.9853 5.54401 10.9 5.5436H8.98715C8.94368 5.53883 8.89982 5.53883 8.85635 5.5436ZM9.39995 11.6V12.8H10.6V11.6H9.39995Z"
                                                    fill="white"
                                                />
                                            </svg>
                                            Ask Fatawa
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* Mobile Menu Toggle Button */}
                            <div className="col-12 d-lg-none mb-3">
                                <button className="btn btn-outline-secondary w-100" onClick={toggleMobileMenu}>
                                    <i className="fa fa-bars">&nbsp;</i>  All Fatawas
                                </button>
                            </div>

                            {/* Sidebar - Vertical Tabs (Hidden on Mobile after toggle) */}
                            <div className={`col-12 col-lg-3 ${isMobileMenuOpen ? '' : 'd-none d-lg-block'}`}>
                                <div className="verticle-left">
                                    <div className="nav flex-column nav-pills" role="tablist">
                                        <a
                                            className={`nav-link ${selectedTab === 'All' ? 'active' : ''}`}
                                            onClick={() => handleTabClick('All')}
                                            role="tab"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            All Fatawas
                                        </a>

                                        {fatawahMaster.length > 0 ? (
                                            fatawahMaster.map((fatawa) => (
                                                <a
                                                    key={fatawa.MID}
                                                    className={`nav-link ${selectedTab === fatawa.MID.toString() ? 'active' : ''}`}
                                                    onClick={() => handleTabClick(fatawa.MID.toString())}
                                                    role="tab"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {fatawa.title}
                                                </a>
                                            ))
                                        ) : (
                                            <p>No fatawas available at the moment.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-12 col-lg-9">
                                <div className="RightSideContent">
                                    {/* Fatawa Content */}
                                    <div className="tab-content mt-3">
                                        {currentItems.length > 0 ? (
                                            currentItems.map((fatwa) => (
                                                <a
                                                    key={fatwa.MID}
                                                    style={{ textDecoration: 'none' }}
                                                    href={`/Answer?mid=${fatwa.MID}`}
                                                >
                                                    <div className="fatawa-blog">
                                                        <h2>{fatwa.fatawah_title}</h2>
                                                        <div className="date-refno">
                                                            <span className="pr-5">
                                                                <i className="fa fa-calendar">&nbsp;</i>
                                                                {new Date(fatwa.Created_Date).toLocaleDateString('en-GB', {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                            </span>

                                                            <span>
                                                                <i className="fa fa-pencil">&nbsp;</i> Ref No #{fatwa.RefNo}
                                                            </span>
                                                        </div>
                                                        <p>
                                                            {fatwa.fatawah_description}
                                                            <span className="know-txt">
                                                                <a href={`/Answer?mid=${fatwa.MID}`}>&nbsp; &nbsp; &nbsp; Know More</a>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </a>
                                            ))
                                        ) : (
                                            <p>No fatawas available at the moment.</p>
                                        )}

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="pagination mt-4 d-flex flex-wrap gap-2">
                                                {renderPageNumbers()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FatawaRec />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default FatawaPage;