/* MINI-GAME — điều hành một thương hiệu giả lập qua 8 quý.
   Mô hình cố định, không ngẫu nhiên: cùng một chiến lược luôn ra cùng một kết quả,
   nên thứ bạn học là nguyên lý, không phải may rủi. Mọi con số là minh hoạ. */
const GAME={
  QUARTERS:8, MARKET:2000000, SPEND_PER_QTR:180000, COST_RATE:.6, BUDGET:3, FIXED:2e9,
  start(){ return {q:0, A:.20, D:.30, R:.50, ref:1, cust:30000, cash:0, hist:[]}; },
  /* m, d, r: tỷ đồng cho media, điểm bán, giữ chân. disc: mức giảm giá 0–0.3 */
  step(st,{m,d,r,disc}){
    const s={...st};
    s.A = s.A*.8 + (1 - s.A*.8) * (1-Math.exp(-m/4)) * .6;          // nhận biết phai 20% mỗi quý nếu không nuôi
    s.D = s.D + (1 - s.D) * (1-Math.exp(-d/10));                      // độ phủ tích luỹ, không phai
    s.R = .5 + .35 * (1-Math.exp(-r/1.5));                            // giữ chân: lợi ích giảm dần theo tiền
    const reach = Math.max(0, this.MARKET*s.A*s.D - st.cust*s.R);
    const neu = reach * .25 * (1+2*disc) * s.ref;
    const kept = st.cust * s.R;
    s.cust = kept + neu;
    const rev = s.cust*this.SPEND_PER_QTR*(1-disc);
    const gross = s.cust*this.SPEND_PER_QTR*(1-this.COST_RATE-disc);
    const spend = (m+d+r)*1e9;
    const profit = gross - spend - this.FIXED;
    s.ref = Math.min(1, s.ref*(1-disc*.5) + .1*(1-s.ref));           // giảm giá kéo giá tham chiếu xuống, hồi dần
    s.cash += profit; s.q++;
    s.hist=[...st.hist,{q:s.q,m,d,r,disc,A:s.A,D:s.D,R:s.R,neu,kept,cust:s.cust,rev,gross,spend,profit}];
    return s;
  },
  share(st){ return st.cust/this.MARKET; },
};
if(typeof module!=='undefined') module.exports=GAME;
