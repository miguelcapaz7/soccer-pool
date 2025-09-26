import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "leaderboard"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => a.placing - b.placing);
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container py-5 text-center">
      <h2 className="text-center mb-4">Leaderboard</h2>
      <table className="table table-bordered mb-2">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Step 1 Pts</th>
            <th scope="col">Step 2 Pts</th>
            <th scope="col">Step 3 Pts</th>
            <th scope="col">Step 4 Pts</th>
            <th scope="col">Total</th>
            <th scope="col">Winner</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user) => (
            <tr key={user.id}>
              <td>{user.placing}</td>
              <td>{user.name}</td>
              <td>{user.step1pts}</td>
              <td>{user.step2pts}</td>
              <td>{user.step3pts}</td>
              <td>{user.step4pts}</td>
              <td>{user.total}</td>
              <td>{user.winner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;