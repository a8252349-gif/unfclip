export const FONTS=[['Noto Sans KR','깔끔한 고딕'],['Noto Serif KR','차분한 명조'],['Gowun Dodum','고운돋움 · 부드럽게'],['Gowun Batang','고운바탕 · 따뜻하게'],['Nanum Gothic','나눔고딕 · 또렷하게']];
export const fontFamily=value=>FONTS.some(([name])=>name===value)?value:'Noto Sans KR';
export const fontWeight=value=>value==='Gowun Dodum'?400:700;
