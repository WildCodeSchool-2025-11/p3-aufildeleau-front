import { useState } from "react";

const Dashboard = () => {
  const [files, setFiles] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

	const formData = new FormData();
	formData.append('email', 'yavuz@kutuk.fr');
	if(files){
		formData.append('avatar', files);
	}

    fetch("http://localhost:3310/api/users/avatar/6", {
      method: "PUT",
      headers: { Authorization: `x-token ${token}` },
      body: formData,
    });
  };

  console.log(files);

  return (
    <div>
      Dashboard
      <p>
          <input
            type="file"
            name="avatar"
            onChange={(e) => setFiles(e.target.files[0] || null)}
          />
          <button onClick={handleSubmit}>Mettre a jour</button>
      </p>
    </div>
  );
};

export default Dashboard;
