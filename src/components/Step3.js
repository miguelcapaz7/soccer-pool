import React from "react";
import { useNavigate } from "react-router-dom";

const Step3 = ({ topTeams }) => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-4 text-center">
      <h2 className="mb-4">
        STEP 3 - Complete the bracket with your predictions for the knockout
        stages
      </h2>
      <div className="row text-center fw-bold mb-3">
        <div className="col">
          Round of 32
        </div>
        <div className="col">
          Round of 16
        </div>
        <div className="col">
          Quarter Finals
        </div>
        <div className="col">
          Semi Finals
        </div>
        <div className="col">
          Finals + 3rd Place
        </div>
        <div className="col">
          Semi Finals
        </div>
        <div className="col">
          Quarter Finals
        </div>
               <div className="col">
          Round of 16
        </div>
        <div className="col">
          Round of 32
        </div>
      </div>
      <div class="row text-center d-flex">
        <div class="col d-flex flex-column justify-content-evenly">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 1</td>
              </tr>
              <tr>
                <td>Team 2</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 3</td>
              </tr>
              <tr>
                <td>Team 4</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 5</td>
              </tr>
              <tr>
                <td>Team 6</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 7</td>
              </tr>
              <tr>
                <td>Team 8</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 9</td>
              </tr>
              <tr>
                <td>Team 10</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 11</td>
              </tr>
              <tr>
                <td>Team 12</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 13</td>
              </tr>
              <tr>
                <td>Team 14</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 15</td>
              </tr>
              <tr>
                <td>Team 16</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col d-flex flex-column justify-content-around">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 1</td>
              </tr>
              <tr>
                <td>Winner RO32 2</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 3</td>
              </tr>
              <tr>
                <td>Winner RO32 4</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 5</td>
              </tr>
              <tr>
                <td>Winner RO32 6</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 7</td>
              </tr>
              <tr>
                <td>Winner RO32 8</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col d-flex flex-column justify-content-around">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO16 1</td>
              </tr>
              <tr>
                <td>Winner RO16 2</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO16 3</td>
              </tr>
              <tr>
                <td>Winner RO16 4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col d-flex flex-column justify-content-around">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner QF 1</td>
              </tr>
              <tr>
                <td>Winner QF 2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col d-flex flex-column justify-content-around">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner SF 1</td>
              </tr>
              <tr>
                <td>Winner SF 2</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Loser SF 1</td>
              </tr>
              <tr>
                <td>Loser SF 2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col d-flex flex-column justify-content-around">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner QF 3</td>
              </tr>
              <tr>
                <td>Winner QF 4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col d-flex flex-column justify-content-around">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO16 5</td>
              </tr>
              <tr>
                <td>Winner RO16 6</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO16 7</td>
              </tr>
              <tr>
                <td>Winner RO16 8</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col d-flex flex-column justify-content-around">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 9</td>
              </tr>
              <tr>
                <td>Winner RO32 10</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 11</td>
              </tr>
              <tr>
                <td>Winner RO32 12</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 13</td>
              </tr>
              <tr>
                <td>Winner RO32 14</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Winner RO32 15</td>
              </tr>
              <tr>
                <td>Winner RO32 16</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 17</td>
              </tr>
              <tr>
                <td>Team 18</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 19</td>
              </tr>
              <tr>
                <td>Team 20</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 21</td>
              </tr>
              <tr>
                <td>Team 22</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 23</td>
              </tr>
              <tr>
                <td>Team 24</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 25</td>
              </tr>
              <tr>
                <td>Team 26</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 27</td>
              </tr>
              <tr>
                <td>Team 28</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 29</td>
              </tr>
              <tr>
                <td>Team 30</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Team 31</td>
              </tr>
              <tr>
                <td>Team 32</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={() => navigate("/step4")} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Step3;
