window.onload = function(){
    console.log('온로드')

    var doc = document;
    const make = doc.getElementById('maketable');

    var getCookie = function(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    };  

    function timetonum(str){    // 시간 교시로 바꾸는 함수
        switch(str){
            case "09:00-10:15":
                str = 1;
                break;
            case "10:30-11:45":
                str = 2;
                break;
            case "12:00-13:15":
                str = 3;
                break;
            case "13:30-14:45":
                str = 4;
                break;
            case "15:00-16:15":
                str = 5;
                break;
            case "16:30-17:45":
                str = 6;
                break;
            case "18:00-19:15":
                str = 7;
                break;
            case "19:30-20:45":
                str = 8;
                break;
            case "21:00-22:15":
                str = 9;
                break;
        }
        return str;
    }
    
    function daytime(arr){
        if(arr[1] == "월" || arr[1] == "화" || arr[1] == "수" || arr[1] == "목" || arr[1] == "금"){     // 일주일에 2번인 수업
            arr[2] = timetonum(arr[2]);
            arr.push('two');
        }
        else{   // 바로 숫자 나오면 일주일에 한번인 수업, str = 시간
            arr[1] = timetonum(arr[1]);  // 교시로 바꿔주기
            if(arr[3] == arr[0]){     // 1교시 이상인 수업
                arr[3] = arr[1] + 1;
                arr.push('one2');
            }
            else{   // 1교시만 하는 수업
                arr.push('one1');
            }
        }
        return arr;
    }

    const sem = async()=>{
        let userCookieId = getCookie('userid');
        console.log(userCookieId)
        // GET
        fetch("http://localhost:3000/time_set?email=" + userCookieId)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            if(res.code === 200){
                location.assign('http://localhost:3000/cr_timetable');
                const countSubject = Object.keys(res.result).length;
                var talarr = res.timeandloc;

                let Montd = doc.createElement('TD');
                let MonDiv = doc.createElement('div');
                let MonP = doc.createElement('p');

                let Tuetd = doc.createElement('td');
                let TueDiv = doc.createElement('div');
                let TueP = doc.createElement('p');

                let Wedtd = doc.createElement('td');
                let WedDiv = doc.createElement('div');
                let WedP = doc.createElement('p');

                let Thutd = doc.createElement('td');
                let ThuDiv = doc.createElement('div');
                let ThuP = doc.createElement('p');

                let Fritd = doc.createElement('td');
                let FriDiv = doc.createElement('div');
                let FriP = doc.createElement('p');

                Montd = doc.createElement('TD');

                for(i = 0; i < countSubject; i++){

                    var arr = talarr[i].split(' ');
                    arr = daytime(arr); 

                    // indexOf(" ")로 하면 일주일에 2번인것도 포함됨
                    if(arr.indexOf('월') != -1){
                        MonDiv = doc.createElement('div');
                        MonP = doc.createElement('p');
                        
                        MonP.appendChild(res.result[i]);
                        MonDiv.style.position = absolute;
                        MonDiv.style.top = (110 + 60*(arr[1] - 1))+'px';

                        if(arr.indexOf('one2') != -1){  // 2교시 이면
                            MonDiv.style.height = 100 + 'px';
                        }
                        MonDiv.style.zIndex = 10;

                        MonDiv.appendChild(MonP);
                    }
                    if(arr.indexOf('화') != -1){
                        TueDiv = doc.createElement('div');
                        TueP = doc.createElement('p');
                        
                        TueP.appendChild(res.result[i]);
                        TueDiv.style.position = absolute;
                        TueDiv.style.top = (110 + 60*(arr[1] - 1))+'px';

                        if(arr.indexOf('one2') != -1){  // 2교시 이면
                            TueDiv.style.height = 100 + 'px';
                        }
                        TueDiv.style.zIndex = 10;

                        TueDiv.appendChild(Tue);
                    }
                    if(arr.indexOf('수') != -1){
                        WedDiv = doc.createElement('div');
                        WedP = doc.createElement('p');
                        
                        WedP.appendChild(res.result[i]);
                        WedDiv.style.position = absolute;
                        WedDiv.style.top = (110 + 60*(arr[1] - 1))+'px';

                        if(arr.indexOf('one2') != -1){  // 2교시 이면
                            WedDiv.style.height = 100 + 'px';
                        }

                        WedDiv.style.zIndex = 10;

                        WedDiv.appendChild(WedP);
                    }
                    if(arr.indexOf('목') != -1){
                        ThuDiv = doc.createElement('div');
                        ThuP = doc.createElement('p');
                        
                        ThuP.appendChild(res.result[i]);
                        ThuDiv.style.position = absolute;
                        ThuDiv.style.top = (110 + 60*(arr[1] - 1))+'px';

                        if(arr.indexOf('one2') != -1){  // 2교시 이면
                            ThuDiv.style.height = 100 + 'px';
                        }
                        ThuDiv.style.zIndex = 10;

                        ThuDiv.appendChild(ThuP);
                    }
                    if(arr.indexOf('금') != -1){
                        FriDiv = doc.createElement('div');
                        FriP = doc.createElement('p');
                        
                        FriP.appendChild(res.result[i]);
                        FriDiv.style.position = absolute;
                        FriDiv.style.top = (110 + 60*(arr[1] - 1))+'px';

                        if(arr.indexOf('one2') != -1){  // 2교시 이면
                            FriDiv.style.height = 100 + 'px';
                        }
                        FriDiv.style.zIndex = 10;

                        FriDiv.appendChild(FriP);
                    }
            }

            }
        })
        .catch(err => {
            console.log('Fetch Error', err);
        });
    }

    // make.addEventListener('click', sem);
    sem();
}



    
