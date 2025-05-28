'use client';

import Layout from '@/components/layouts/Layout';
import { useEffect, useState } from 'react';
import Group287 from '../Assets/Images/Icons/Group 2287.svg';
import Group288 from '../Assets/Images/Icons/Group 2288.svg';
import { AskfatawasendMails, PageGetfatawah_master, postCreateAskFatawa } from '@/services/Manage_services';
import { toast } from 'react-toastify';
import Login from '@/components/Auth/Login';
import { useAuth } from '@/context/AuthContext'; // 👈 Import Auth Context

interface FatawaMaster {
  fatawah_master_MID: number;
  title: string;
}

export default function AskFatwa() {
  const [message, setMessage] = useState('');
  const [fatawahMaster, setFatawahMaster] = useState<FatawaMaster[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { isLoggedIn, login } = useAuth(); // 👈 Use global auth state

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    madahab: '',
    occupation: '',
    gender: '',
    country: '',
    state: '',
    category: '',
    title: '',
    question: '',
    fatawah_master_MID: '',
    terms: false,
  });

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession !== 'true') {
      setIsLoginModalOpen(true);
    }

    fetchFatawahMaster();
  }, []);

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

  const handleChange = (


    
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    const userSession = sessionStorage.getItem('user');
    if (userSession !== 'true') {
      setIsLoginModalOpen(true);
    }

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    const {
      name,
      email,
      mobile,
      madahab,
      occupation,
      gender,
      country,
      state,
      title,
      question,
      fatawah_master_MID
    } = formData;

    if (
      !name || !email || !mobile || !madahab || !occupation || !gender || !country || !state ||
      !title || !question || !fatawah_master_MID
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const requestData = {
      fatawah_master_MID: Number(fatawah_master_MID),
      fatawah_title: title,
      fatawah_description: question,
      type: formData.category || 'Islamic Finance',
      Status: true,
      Question: question,
      Answer: '',
      FullName: name,
      EmailID: email,
      MobileNo: mobile,
      Madahab: madahab,
      Occupation: occupation,
      Gender: gender,
      Country: country,
      state: state,
      Created_By: 'Website',
    };

    try {

      const response = await postCreateAskFatawa(requestData);
      console.log("response", response);
      // ✅ Send email only after successful fatawa submission
      const emailResponse = await AskfatawasendMails({
        name: requestData.FullName,
        email: requestData.EmailID,
        question: requestData.Question,
      });
      console.log("emailResponse", emailResponse);
      if (emailResponse?.isSuccess) {
        console.log('Email sent successfully.');
      } else {
        console.warn('Email failed to send.');
      }

      if (response?.statusCode === 200 || response?.isSuccess) {
        toast.success('Fatawa submitted successfully.');
        setMessage('Fatawa submitted successfully.');
        setFormData({
          fatawah_master_MID: '',
          name: '',
          email: '',
          mobile: '',
          madahab: '',
          occupation: '',
          gender: '',
          country: '',
          state: '',
          category: '',
          title: '',
          question: '',
          terms: false,
        });
      } else {
        toast.error(response?.message || 'Failed to submit fatawa.');
      }
    } catch (error) {
      console.error('Error submitting fatawa:', error);
      toast.error('Error submitting fatawa.');
    }
  };

  const handleLoginSuccess = () => {
    login(); // ✅ Global login state
    sessionStorage.setItem('user', 'true'); // optional
    setIsLoginModalOpen(false);
    toast.success('Login successful!');
  };



  return (
    <Layout>
      <div className="ask-fatwa-form">
        <div className="ask-fatawa-title">
          <img src={Group287.src} alt="Group 287" />
          <h3 className="form-title">Ask Your Fatawa</h3>
          <img src={Group288.src} alt="Group 288" />
        </div>

        <div className="instructions">
          <p className="pheadline">Kindly read the following before submitting a question.</p>
          <ol className="askphead">
            <li>Please check if a similar question already exists on the site.</li>
            <li>Ensure that the question is clear and in good English.</li>
            <li>Make sure the question title focuses on your main point.</li>
            <li>Select the appropriate category for your question.</li>
            <li>Ask one question per "Question" box. Separate related questions in different boxes.</li>
          </ol>
        </div>

        <form style={{ padding: '10px' }} onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="name">Full Name*</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="email">Email ID*</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="mobile">Mobile No*</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your Mobile No."
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="madahab">Madahab</label>
              <select id="madahab" name="madahab" value={formData.madahab} onChange={handleChange}>
                <option value="">Select Mazhab</option>
                <option value="Hanfi">Hanfi</option>
                <option value="Shafayi">Shafayi</option>
                <option value="Maliki">Maliki</option>
                <option value="Hanbali">Hanbali</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Enter your Occupation"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your Country"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your State"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="category">Question Category</label>
              <select id="fatawah_master_MID" name="fatawah_master_MID" value={formData.fatawah_master_MID} onChange={handleChange} required>
                <option value="">Select Category</option>
                {fatawahMaster.map((fatawah) => (
                  <option key={fatawah.fatawah_master_MID} value={fatawah.fatawah_master_MID}>
                    {fatawah.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="title">Question Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Question Title"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="question">Your Question*</label>
            <textarea
              id="question"
              name="question"
              rows={4}
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter your question here"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success">
            Submit Question
          </button>

          {message && (
            <label className="submission-message" style={{ color: 'red', marginTop: '8px' }}>
              {message}
            </label>
          )}
        </form>
      </div>

      {/* ✅ Corrected Login Modal usage */}
      {isLoginModalOpen && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </Layout>
  );
}