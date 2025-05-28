import React, { useEffect, useState } from 'react';
import ourps from '../../Assets/images/ourps.png';
import { getOurPersonalities } from '@/services/Manage_services';
import { toast } from 'react-toastify';

// Define the Personality interface
interface Personality {
    Mid: number;
    Name: string;
    Description: string;
}

const OurPersonalities = () => {
    // Use the Personality interface for the state
    const [personalities, setPersonalities] = useState<Personality[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const fetchPersonalities = async () => {
        try {
            const response = await getOurPersonalities();
            if (response?.statusCode === 200) {
                console.log("response.data", response.data);
                setPersonalities(response.data);
            } else {
                toast.error('Failed to fetch personalities.');
            }
        } catch (error) {
            console.error('Error fetching personalities:', error);
            toast.error('Error fetching personalities.');
        }
    };

    useEffect(() => {
        fetchPersonalities();
    }, []);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto mt-5 p-4">
            {personalities.length > 0 ? (
                <div>
                    <div className="row">
                        {personalities.map((personality, index) => (
                            <div className="col-lg-6" key={personality.Mid}>
                                <div
                                    data-property-1="Default"
                                    data-sIde="LTR"
                                    onClick={() => toggleAccordion(index)}
                                    className="deflt"
                                >
                                    <img style={{ width: 53, height: 52 }} src={ourps.src} />
                                    <div
                                        style={{
                                            color: 'black',
                                            fontSize: 20,
                                            fontFamily: 'Noto Sans',
                                            fontWeight: '500',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        {personality.Name}
                                    </div>
                                </div>

                                {openIndex === index && (
                                    <div className="pt-3">{personality.Description}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No personalities found.</p>
            )}
        </div>
    );
};

export default OurPersonalities;
