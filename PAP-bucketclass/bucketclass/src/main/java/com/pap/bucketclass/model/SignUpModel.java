package com.pap.bucketclass.model;

import java.io.Serializable;

import com.pap.bucketclass.entity.Member;

public class SignUpModel implements Serializable {
	
	private String memberId;
	private String memberPassword;
	private String confirmPassword;
	private String memberEmail;
	private String memberNickname;
	private String roleName;
	
	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getMemberPassword() {
		return memberPassword;
	}

	public void setMemberPassword(String memberPassword) {
		this.memberPassword = memberPassword;
	}
	
	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

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

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Member toMember() {
		Member member = new Member();
		member.setMemberId(memberId);
		member.setMemberEmail(memberEmail);
		member.setMemberNickname(memberNickname);
		member.setMemberPassword(memberPassword);
		
		return member;
	}
	
	@Override
	public String toString() {
		return " memberId : " + memberId 
				+"\n memberNickname : " + memberNickname 
				+"\n memberEmail : " + memberEmail
				+"\n memberPassword : " + memberPassword 
				+"\n confirmPassword : " + confirmPassword 
				+"\n roleName : " + roleName;
	}

}
