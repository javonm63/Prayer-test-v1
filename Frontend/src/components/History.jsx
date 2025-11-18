import axios from "axios";

function History() {
    return (
        <div className="w-full mt-14.5 sm:mt-16 bg-gradient-to-br from-[#FFF8DE] to-[#FBEBAA] text-[#3B060A]">
            <div className="w-full h-[90vh]">
                <div className="w-full h-[22.5%] flex items-center">
                    <div className="w-[50%] h-[100%] p-[15px] flex flex-col items-start">
                        <h1 className="font-[500] text-[40px] font-sans mt-[15px] text-[#3B060A]/80">HISTORY</h1>
                        <p className="font-[400] text-[17px] font-sans sm:text-[25px] text-[#3B060A]/80">Track your session counts over time.</p>
                    </div>
                    <div className="w-[50%] h-[100%] p-[15px] flex items-center justify-end gap-[5%]">
                        <select className="w-[45%] h-[40%] text-[20px] text-center border-2 text-[#3B060A]/80">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                        <button className="w-[45%] h-[40%] text-[20px] border-2 text-[#3B060A]/80" type="button">resfresh</button>
                    </div>
                </div>
                <div className="w-full h-[75%] flex items-center">
                    <div className="h-[100%] w-[50%] border-2 pl-[15px] pr-[15px] flex flex-col items-center">
                        <div className="text-[30px]">Totals Graph</div>

                    </div>
                    <div className="h-[100%] w-[50%] pl-[15px] pr-[15px] flex flex-col items-center gap-[5%]">
                        <div className="h-[35%] w-[100%] rounded-[10px] shadow-[0px_0px_7px_rgba(0,0,0,0.30)] flex flex-col items-center">
                            <div className="text-[30px] mt-[10px]">Totals Summary</div>
                            <div className="w-[100%] h-[75%] flex items-center justify-evenly">
                                <p className="h-[40%] w-[30%] flex items-center justify-center rounded-[5px] text-[20px] border-2 border-[rgba(0,0,0,0.30)]">Count: 123</p>
                                <p className="h-[40%] w-[30%] flex items-center justify-center rounded-[5px] text-[20px] border-2 border-[rgba(0,0,0,0.30)]">Rounds: 1</p>
                                <p className="h-[40%] w-[30%] flex items-center justify-center rounded-[5px] text-[20px] border-2 border-[rgba(0,0,0,0.30)]">Streak: 0</p>
                            </div>
                        </div>
                        <div className="h-[325px] w-[100%] rounded-[10px] shadow-[0px_0px_7px_rgba(0,0,0,0.30)] flex flex-col items-center">
                            <div className="text-[30px] mt-[10px]">Session Events</div>
                            <ol className="w-[70%] h-[255px] overflow-y-auto">
                                <li className="w-[100%] h-[40px] mb-[10px] text-center text-[18px] border-2 border-[rgba(0,0,0,0.30)]">11/17/2025: +3</li>
                                <li className="w-[100%] h-[40px] mb-[10px] text-center text-[18px] border-2 border-[rgba(0,0,0,0.30)]">11/17/2025: +2</li>
                                <li className="w-[100%] h-[40px] mb-[10px] text-center text-[18px] border-2 border-[rgba(0,0,0,0.30)]">11/17/2025: +6</li>
                                <li className="w-[100%] h-[40px] mb-[10px] text-center text-[18px] border-2 border-[rgba(0,0,0,0.30)]">11/16/2025: +4</li>
                                <li className="w-[100%] h-[40px] mb-[10px] text-center text-[18px] border-2 border-[rgba(0,0,0,0.30)]">11/16/2025: +3</li>
                                <li className="w-[100%] h-[40px] mb-[10px] text-center text-[18px] border-2 border-[rgba(0,0,0,0.30)]">11/15/2025: +6</li>
                                <li className="w-[100%] h-[40px] mb-[10px] text-center text-[18px] border-2 border-[rgba(0,0,0,0.30)]">11/15/2025: +2</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[30vh] border-2"></div>
        </div>
    )
}

export default History


// add chart and botom container contents then move on to functionality 