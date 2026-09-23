export const FONTS=[['Jua','배민 주아 · 둥글고 친근하게'],['Do Hyeon','배민 도현 · 굵고 또렷하게'],['Yeon Sung','배민 연성 · 자연스러운 손글씨'],['Noto Sans KR','기본 고딕'],['Noto Serif KR','기본 명조']];
export const fontFamily=value=>FONTS.some(([name])=>name===value)?value:'Jua';
export const fontWeight=value=>['Noto Sans KR','Noto Serif KR'].includes(value)?700:400;
