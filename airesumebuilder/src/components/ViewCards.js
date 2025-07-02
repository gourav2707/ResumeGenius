import AllNavbar from "./AllNavbar";

function ViewCard(){
    return<>
    <AllNavbar/>
     <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="text-center">
          <p className="text-danger fs-5">
            ⚠️ No Cards data found. Please Create Card first.
          </p>
        </div>
      </div>
    </>
}
export default ViewCard;