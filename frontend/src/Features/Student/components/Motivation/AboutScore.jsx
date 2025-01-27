import aboutScore from "../../../../assets/aboutScore.png";

const AboutScore = () => {
    return (
      <div className="bg-white p-6  mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
        <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
        About Your Score
      </button>
      <p className="ms-1 w-24 rounded-xl mb-4 border-t-4 border-[#BC6FFB]"></p>
          <h3 className="text-xl font-poppins font-semibold mb-2">The New Way of Learning</h3>
          <p className="text-gray-700 font-poppins mb-4">
          With the Score System, Learning is full of entertainment and fun. 
          For the first time, your interaction with different school activities will give you rewards,
           discounts, and exclusive offers for our members in many famous places and shops.
          </p>
          <h3 className="text-xl font-poppins font-semibold mb-2">Why?</h3>
          <p className="text-gray-700 font-poppins font-medium">
            <br />
            When you interact with different learning objects and activates, 
            you will earn points and start competing with your colleagues
            based on the score of each one, exactly as if you are competing with them in a game.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={aboutScore}
            alt="Score Illustration"
            className="w-60 h-75 "
          />
        </div>
      </div>
    );
  };
  export default AboutScore;  