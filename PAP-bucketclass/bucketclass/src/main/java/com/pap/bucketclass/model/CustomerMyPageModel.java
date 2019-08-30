package com.pap.bucketclass.model;

import com.pap.bucketclass.entity.Member;

public class CustomerMyPageModel {
	
	private String memberEmail;
	private String memberNickname;
//	private String memberImg;
	private String introduce;
	
	public String getMemberEmail() {
		return memberEmail;
	}
	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}
	public String getMemberNickname() {
		return memberNickname;
	}
	public void setMemberNickname(String memberNickname) {
		this.memberNickname = memberNickname;
	}
//	public String getMemberImg() {
//		return memberImg;
//	}
//	public void setMemberImg(String memberImg) {
//		this.memberImg = memberImg;
//	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	
	public Member toMember() {
		Member member = new Member();
		member.setMemberEmail(memberEmail);
		member.setMemberNickname(memberNickname);
//		member.setMemberImg(memberImg);
		member.setIntroduce(introduce);
		return member;
	}
	
}
