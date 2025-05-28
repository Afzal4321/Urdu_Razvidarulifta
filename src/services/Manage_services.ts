
  import { get, post, put, del } from "./instance";
  
  





 export const Getbook_masterFront = async (): Promise<any> => {
   return await get("/Masters/Getbook_master");
 };

 export const getLatestFatawa = async (): Promise<any> => {
  return await get("/Transactions/LatestFatawa");
};


export const GetIslamicBookCollection = async (Book_Name: string, selectedType: string): Promise<any> => {
  return await get(`/Transactions/IslamicBookCollection/${Book_Name}/${selectedType}`);
};



export const GetLatestArticlesHome = async (): Promise<any> => {
  return await get("/Transactions/LatestArticlesHome");
};

export const PageGetfatawah = async (): Promise<any> => {
  return await get("/Transactions/Getfatawah");
};




export const FatchGetfatawahWithCate = async (Cate: string): Promise<any> => {
  return await get(`/Transactions/GetFatawahbyCategory/${Cate}`);
};



export const PageGetfatawah_master = async (): Promise<any> => {
  return await get("/Masters/Getfatawah_master");
};


export const GetBookDetails = async (id: number): Promise<any> => {
  return await get(`/Transactions/GetBookDetailWith/${id}`);
};



export const PageLatestArticleMain = async (): Promise<any> => {
  return await get("/Transactions/LatestArticleMain");
};

export const GetArticalDetailsByID = async (id: number): Promise<any> => {
  return await get(`/Transactions/ArticalDetailsByID/${id}`);
};

export const GetFatawahbyMID = async (id: number): Promise<any> => {
  return await get(`/Transactions/FatawahbyMID/${id}`);
};

export const getOurPersonalities = async (): Promise<any> => {
  return await get('/Transactions/Personalities')

};


export const getSearchGlobal = async (): Promise<any> => {
  return await get('/Transactions/SearchGlobal')

};


export const postCreateAskFatawa = async (iData: any) => {
  return await post("/Transactions/CreateAskFatawa", iData);
};



export const PageGetgetauthor = async (): Promise<any> => {
  return await get("/Masters/getauthor");
};


// 🔄 Fix these two methods to accept data and use POST
export const Userlogincreate = async (data: any): Promise<any> => {
  return await post("/login/Userlogincreate", data);
};

export const UserLoginCheck = async (data: any): Promise<any> => {
  return await post("/login/UserLoginCheck", data);
};


export const getsBookscounter = async (): Promise<any> => {
  return await get('/Transactions/Bookscounter')

};


export const getLiveEventshome = async (): Promise<any> => {
  return await get('/Transactions/LiveEventshome')

};


export const getLiveEventsMain = async (): Promise<any> => {
  return await get('/Transactions/LiveEventsMain')

};

export const ForgotPasswordRequest = async (Email: string): Promise<any> => {
  return await get(`/Transactions/forgotPassword/${Email}`);
};


export const GeSliderCall = async (PageName: string): Promise<any> => {
  return await get(`/Transactions/FetchSliderData/${PageName}`);
};


export const AskfatawasendMails = async (data: any): Promise<any> => {
  return await post("/Transactions/askfatawasendMail", data);
};

export const PostCreateOurNewLetter = async (iData: any) => {
  return await post("/Transactions/OurNewsletter", iData);
};
