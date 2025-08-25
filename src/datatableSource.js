export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 200 },
  
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const userRows = [
  {
    id: 1,
    username: "kenny",
    img: "/assets/person/person1.jpg",
    email: "kenny@gmail.com",
    status: "active",
  },
  {
    id: 2,
    username: "Basirah",
    img: "/assets/person/person2.jpg",
    email: "basirat@gmail.com",
    status: "passive",
  },
  {
    id: 3,
    username: "Abike",
    img: "/assets/person/person3.jpg",
    email: "abike@gmail.com",
    status: "pending",
   
  },
  {
    id: 4,
    username: "Nafisah",
    img: "/assets/person/person4.jpg",
    email: "nafisha@gmail.com",
    status: "active",
   
  },
  {
    id: 5,
    username: "Zainab",
    img: "/assets/person/person5.jpg",
    email: "zainab@gmail.com",
    status: "pending",
    
  },
  {
    id: 6,
    username: "Yusiroh",
    img: "/assets/person/person6.jpg",
    email: "yusiroh@gmail.com",
    status: "passive",
    
  },
  {
    id: 7,
    username: "Salewa",
    img: "/assets/person/person7.jpg",
    email: "salewa@gmail.com",
    status: "active",
    
  },
  {
    id: 8,
    username: "Alaba",
    img: "/assets/person/person8.jpg",
    email: "alaba@gmail.com",
    status: "passive",
    
  },
  {
    id: 9,
    username: "Ikimo",
    img: "/assets/person/person1.jpg",
    email: "ikimo@gmail.com",
    status: "active",
   
  },
  {
    id: 10,
    username: "Barakah",
    img: "/assets/person/person2.jpg",
    email: "barakah@gmail.com",
    status: "passive",
    
  },
  {
    id: 11,
    username: "Kaosarah",
    img: "/assets/person/person3.jpg",
    email: "kaosarah@gmail.com",
    status: "pending",
   
  },
  {
    id: 12,
    username: "Nike",
    img: "/assets/person/person4.jpg",
    email: "nike@gmail.com",
    status: "active",
    
  },
  {
    id: 13,
    username: "Lolade",
    img: "/assets/person/person5.jpg",
    email: "lolade@gmail.com",
    status: "pending",
    
  },
  {
    id: 14,
    username: "Jumoke",
    img: "/assets/person/person6.jpg",
    email: "jumoke@gmail.com",
    status: "passive",
   
  },
  {
    id: 15,
    username: "Yatunde",
    img: "/assets/person/person7.jpg",
    email: "yatunde@gmail.com",
    status: "active",
    
  },
  {
    id: 16,
    username: "Sebastian",
    img: "/assets/person/person8.jpg",
    email: "sebastian@gmail.com",
    status: "passive",
    
  },
  {
    id: 16,
    username: "Idowu",
    img: "/assets/person/person8.jpg",
    email: "idowu@gmail.com",
    status: "passive",
    
  },
  {
    id: 17,
    username: "Anike",
    img: "/assets/person/person8.jpg",
    email: "anike@gmail.com",
    status: "passive",
    
  },
];
