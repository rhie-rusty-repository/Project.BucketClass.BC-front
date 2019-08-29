//////////////////////////////////////////내 프로필 수정관련 함수///////////////////////////////////////////////////////

//1. mypage 페이지 왔을 때 저장되어 있는 data 불러오기.
//2. 내 프로필 정보수정 버튼 클릭하면 입력한 데이터가 저장, 수정된 data 불러오기

var callpassword;
var memberId;
var res;

// ====================== 1. MyPage Loading ==========================
//1. MyPage Loading -> 내 정보를 받아서 뿌려줘야 함.
$(document).ready(function () {

    Apis.getRequest('provider/mypage/${memberId}').then(response =>{
        console.log(response);//promise객체로 옴. 이제 그걸 풀어서, 화면에 뿌려줘야함.
        showMypage(response);

    }); //getrequest로 요청보냄. return으로 response=>response.json()으로 받아짐.

}); //MyPage Loading END

// ==================== Tag & Value Mapping =======================
function showMypage(profileData) {
    console.log(profileData);
    memberId = '${memberId}';

    insertValue('memberNickname', profileData[memberId].memberNickname);
    insertValue('memberEmail', profileData[memberId].memberEmail);
    insertValue('career', profileData[memberId].career);
    insertValue('certi', profileData[memberId].certi);
    insertValue('introduce', profileData[memberId].introduce);

    insertText('memberJoinDate', profileData[memberId].memberJoinDate);

    // insertProfileImgResource('memberImg', profileData[memberId].memberImg);
    callPW(profileData[member_id].memberPassword);
};

// 1) 단일 값 맵핑
function insertValue(tag, column) {
    if (column == null) {
        document.getElementById(tag).setAttribute('placeholder', '입력하세요');
    } else {
        document.getElementById(tag).setAttribute('value', column);
    }
};

function insertText(tag, column) {
    document.getElementById(tag).appendChild(document.createTextNode(column));
};

// // 2) 프로필 이미지 소스 맵핑 //로직 다시 짜보기(ClassName :콜랙션으로 됨)
// function insertProfileImgResource(tag, column) {
//
// 	//document.getElementsByClassName(tag).setAttribute('src', column);
// 	document.getElementById(tag).setAttribute('src', column);
// 	var id2 = (tag + "1");
// 	document.getElementById(id2).setAttribute('src', column);
// 	// const imgTag = document.getElementById(tag);
// 	// const imgItem = document.createElement('img');
// 	// imgItem.setAttribute('src', column);
// 	// imgTag.appendChild(imgItem);
// };
function callPW(column) {
    callpassword = column;
    return callpassword;
}
//Tag & Data Mapping / END

//=====================================2. MyPage Update=======================================
//MyPage Update Button
document.getElementById('buttonProfile').addEventListener('click', button_myprofile);

function button_myprofile(){

    if(checkAll() === true){
        var providerMypageObject = new Object();
        providerMypageObject.memberNickname = document.getElementById("memberNickname").value;
        providerMypageObject.memberEmail = document.getElementById("memberEmail").value;
        providerMypageObject.career = document.getElementById("career").value;
        providerMypageObject.certi = document.getElementById("certi").value;
        providerMypageObject.introduce = document.getElementById("introduce").value;

        console.log(typeof providerMypageObject, providerMypageObject); //수정 버튼 누를 시, 값들이 JSON으로 변환.

        Apis.updateProviderProfile(providerMypageObject).then(response => { //JSON으로 변환된 값들을 DB로 보낸다.
            Apis.getRequest('provider/mypage/${memberId}').then(response =>{ //updateProviderProfile함수에서 반환된 값(수정된 mypage 정보)를 다시 뿌려준다.
                console.log(response);//promise객체로 옴. 이제 그걸 풀어서, 화면에 뿌려줘야함.
                showMypage(response);
            });
        }); alert("수정 완료!")
    } else
        alert("필수입력 항목의 빈칸을 채워주세요~");

};

////////////////////////////////////////프로필수정 입력 여부 검사///////////////////////////////////////////////////////
function checkAll() {

    if (checkNickName === false) {
        return false;
    }
    if (checkMail === false) {
        return false;
    }

    if (checkIntro === false) {
        return false;
    }
    return true;
}

//자기소개 관련함수//
//자기소개 체크
function checkIntro() {
    var text = document.getElementById("introduce");

    if (text.value == "") {
        alert("자기소개를 입력해 주세요!");
        return false;
    }else
        return true;
};

//자기소개 란 글자수제한: textarea에 입력된 문자의 바이트 수를 체크
function checkByte(form, limitByte) {

    //obj는 받아오는 객체의 값, limitByte 최대 바이트 수. 초과할 수 없음
    //var strValue = form.value();
    var totalByte = 0;
    var note = document.getElementById("introduce").value;
    //var len = 0;
    //var limitByte = 500;

    for (var i = 0; i < note.length; i++) {

        var currentByte = note.charCodeAt(i);//charcodeat은 유니코드 받아오는 거

        if (currentByte > 128) {
            totalByte += 2;
        } else {
            totalByte++;
        }
        // if(totalByte <= limitByte){
        // 	len = i + 1;
        // }
    }

    // 현재 입력한 문자의 바이트 수를 체크하여 표시
    $('#introbyte').text(totalByte);


    // 입력된 바이트 수가 limitByte를 초과 할 경우 경고창 및 글자수 제한
    if (totalByte > limitByte / 2) {
        if (confirm(limitByte / 2 + "글자까지 입력 가능합니다.") === true) {

            document.getElementById("introduce").value = note.slice(0, limitByte / 2);
            $('#introbyte').text(limitByte / 2);
            // document.getElementById("introduce").focus();
        }

        //for(var i=0; i<limitByte; i++){
        //form.introduce.value = note.substr(0,limitByte/2);
        //str = strValue.substr(0, len);
        //form.value = str;
        //checkByte(form, 500);
    };
};

//e-mail 관련함수
//e-mail 입력체크
function checkMail() {
    var mail = document.getElementById("memberEmail").value;

    if (mail == "") {
        alert("E-Mail을 입력해 주세요!");
        return false;

    }else
        return true;
};

function emailValidity(val) {
    // 이메일 유효성 정규식
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (regex.test(val) == false) {
        document.getElementById("checkemail").innerHTML = "잘못된 이메일 형식입니다.";
        document.getElementById("checkemail").style.color = "red";
        val.value = "";
        return false;
    }else {
        document.getElementById("checkemail").innerHTML = "";
    }
};

function checkNickName() {
    var name = document.getElementById("memberNickname").value;

    if (name == "") {
        alert("닉네임을 입력해 주세요!");
        return false;
    } else
        return true;
}

function nickValidity(val) {

    // 닉네임 유효성 검사 (영문소문자, 숫자만 허용)
    for (var i = 0; i < val.length; i++) {
        var ch = val.charAt(i);
        if (!(ch >= '0' && ch <= '9') && !(ch >= 'a' && ch <= 'z') && !(ch >= 'A' && ch <= 'Z')) {
            document.getElementById("checknick").innerHTML = "닉네임은 대소문자, 숫자만 입력가능합니다.";
            val.focus();
            return false;
        } else {
            document.getElementById("checknick").innerHTML = "";
        }
    }
    // 닉네임 길이 체크 (4~12자)
    if (val.length < 4 || val.length > 12) {
        document.getElementById("checknick").innerHTML = "닉네임을 4~12자까지 입력해주세요.";
        document.getElementById("checknick").style.color = "red";
        return false;
    } else {
        document.getElementById("checknick").innerHTML = "";
    }
};


/////////////////////////////////////////////비밀번호 관련 함수/////////////////////////////////////////////////////////

//////////////////////////////////////////Update Password//////////////////////////////////////////////////////
document.getElementById('buttonPassword').addEventListener('click', button_password);

function button_password() {

    if (CheckPasswordUpdate()===true) {
        var providerPwUpdateObject = new Object();
        providerPwUpdateObject.memberPassword = document.getElementById("confirmpassword").value;

        Apis.updateProviderProfile(providerPwUpdateObject);//보내주기만 하면 됨.. 값을 안 받아와도 됨.
        alert("비밀번호 수정 완료! ");

    }else{
        alert("비밀번호 수정 오류! 다시 확인해주세요");
    }

};

//입력값 여부, 일치 검사
function CheckPasswordUpdate(){

    if (checkPassword===false) {
        return false;
    }
    if (checkNewPassword === false) {
        return false;
    }
    if (checkConfirmPassword === false) {
        return false;
    }
    return true;
}

//1) 현재비밀번호 입력 칸
// : 입력값 존재 여부 체크
// : 데이터 불러와서 아이디와 맞는 비밀번호인지 비교
function checkPassword() {
    var pw = document.getElementById("memberPassword").value;

    if(pw == ""){
        alert("기존 비밀번호를 입력해 주세요!");
        return false;
    }else{
        // Apis.postRequest("customer/mypage/${memberId}", pw).then(response =>{
        //     if(pw === response[memberId].memberPassword){
        //         document.getElementById("pw-notify").innerHTML = "비밀번호가 일치합니다.";
        //     }else
        //     {
        //         document.getElementById("pw-notify").innerHTML = "비밀번호가 일치하지 않습니다.";
        //         document.getElementById("pw-notify").style.color = "red";
        //     }
        //
        // }) //프로필 버튼 눌렸을 때 다시 담아가니까.. 새롭게 비밀번호만 불러오는 거..
        if(pw === callpassword){
            document.getElementById("pw-notify").innerHTML = "비밀번호가 일치합니다.";
            return true;
        }else {
            document.getElementById("pw-notify").innerHTML = "비밀번호가 일치하지 않습니다.";
            document.getElementById("pw-notify").style.color = "red";
            return false;
        }//이미 한번 뿌려진 비밀번호 callpassword를 이용

    }
}


//2) 새 비밀번호,새 비밀번호 확인 입력 함수_ 1.입력여부,2.유효성검사,3.새 비밀번호,새 비밀번호 일치확인
function checkNewPassword(){
    var prepw = document.getElementById("memberPassword").value;
    var newpw = document.getElementById("newpassword").value;

    if(prepw == newpw){
        alert("변경할 비밀번호는 기본 비밀번호와 같지 않아야 합니다.");
        return false;
    }
    if (newpw == "") {
        alert("새 비밀번호를 입력하세요");
        return false;
    }
    else
        return true;
};

function checkConfirmPassword(){
    var newpw = document.getElementById("newpassword").value;
    var confirmpw = document.getElementById("confirmpassword").value;

    if(confirmpw == ""){
        alert("새 비밀번호를 한번 더 입력해주세요");
        return false;
    }
    if(newpw != confirmpw) {
        alert("변경할 비밀번호가 일치하지 않습니다");
        return false;
    }
    return true;
};


/////////////////////////////////////////////새 비밀번호 유효성검사/////////////////////////////////////////////////
function newPwValidity(val) {

    //var newpasswordRegExp = /^[a-zA-z0-9]{4,12}$/; //비밀번호 길이 체크(8~16자 까지 허용)

    if (val.length < 8 || val.length > 16) {
        document.getElementById("new-pw-notify").innerHTML = "비밀번호를 8~16자까지 입력해주세요.";
        document.getElementById("new-pw-notify").style.color = "red";
        return false;
    } else {
        document.getElementById("new-pw-notify").innerHTML = "";
    }
};

function confirmPwValidity(val) {

    if (val.length < 8 || val.length > 16) {
        document.getElementById("confirm-pw-notify").innerHTML = "비밀번호를 8~16자까지 입력해주세요.";
        document.getElementById("confirm-pw-notify").style.color = "red";
        return false;
    } else {
        document.getElementById("confirm-pw-notify").innerHTML = "";
    }
};