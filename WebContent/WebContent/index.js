window.onload = function() {
	handleRefresh();
	
	
} 

var url;
var start = 1;
var end = 9;
var num = 9;
var NAME =new Array(9);
var X =new Array(9);
var Y = new Array(9);
var map,check;
var i = 37.657715 , j = 126.991659;
var initmap = true;
var what;
function handleRefresh() {
	//map은 한번만 생성해줘야 하기 때문에 init이 true일 때 만들어지고 바로 false로 만들어줌으로서 한 번만 생성됩니다.
	if(initmap == true){
		makemap();
		initmap = false;
	}
	
	
	url = "http://openapi.seoul.go.kr:8088/635069627177616e34316378627166/json/SeoulGilWalkCourse/"
		+ start + "/" + end + "/";
			$.getJSON(url, updateRoad);
}


function first() {
	//검색을 위해 선택한 것의 위치를 가져옵니다.
	var checkvalue = $("#road option:selected").val();
	//전에 검색한 내용을 지웁니다.
	$(document).ready(function() {
		$("#roads").empty();
	});
	 if (checkvalue == 1) {		
		 start = 1;
	} else if (checkvalue == 2) {
		 start = 854;
	} else if (checkvalue == 3) {
		 start = 970;
	} else if (checkvalue == 4) {
		 start = 1032;
	} else if (checkvalue == 5) {
		 start = 1074;
	}
	end = start+num;
	handleRefresh();
}

function finish() {
	//검색을 위해 선택한 것의 위치를 가져옵니다.
	var checkvalue = $("#road option:selected").val();
	//전에 검색한 내용을 지웁니다.
	$(document).ready(function() {
		$("#roads").empty();
	});

	 if (checkvalue == 0) {		
	    end = 1454;
	}else if (checkvalue == 1) {		
		end = 853;
	} else if (checkvalue == 2) {
		end = 969;
	} else if (checkvalue == 3) {
		end = 1031;
	} else if (checkvalue == 4) {
		end = 1073;
	} else if (checkvalue == 0 || checkvalue == 5) {
		end = 1454;
	}
	start = end-num;
	handleRefresh();
}

function next() {
	//검색을 위해 선택한 것의 위치를 가져옵니다.
	var checkvalue = $("#road option:selected").val();
	//전에 검색한 내용을 지웁니다.
	$(document).ready(function() {
		$("#roads").empty();
	});

	if (checkvalue == 0) {
		if (end < 1454) {
			start += num;
			end += num;
		}
	} else if (checkvalue == 1) {
		if (end < 853) {
			start += num;
			end += num;
		}
	} else if (checkvalue == 2) {
		if (end < 969) {
			start += num;
			end += num;
		}
	} else if (checkvalue == 3) {
		if (end < 1031) {
			start += num;
			end += num;
		}
	} else if (checkvalue == 4) {
		if (end < 1073) {
			start += num;
			end += num;
		}
	} else if (checkvalue == 5) {
		if (end < 1454) {
			start += num;
			end += num;
		}
	}
	handleRefresh();
}

function previous() {
	//나오는 수가 0보다 크면 전으로 돌아갈 수 있습니다.
	if (start > 0) {
		$(document).ready(function() {
			$("#roads").empty();
		});
		start -= num;
		end -= num;
		handleRefresh();
	}
}

function search() {
	//검색을 위해 선택한 것의 위치를 가져옵니다.
	var checkvalue = $("#road option:selected").val();
	$(document).ready(function() {
		$("#roads").empty();
	});

	//검색할 카테고리에 따라 데이터를 불러오는 url을 바꿔줍니다.
	 if (checkvalue == 0 || checkvalue == 1) {		
		 start = 1;
	} else if (checkvalue == 2) {
		 start = 854;
	} else if (checkvalue == 3) {
		 start = 970;
	} else if (checkvalue == 4) {
		 start = 1032;
	} else if (checkvalue == 5) {
		 start = 1074;
	}
	 end = start+num;
	console.log(url);
	handleRefresh();
}

function makemap() {
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
	mapOption = {
		center : new kakao.maps.LatLng(i, j), // 지도의 중심좌표
		level : 3
	// 지도의 확대 레벨
	};

	map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
	var mapTypeControl = new kakao.maps.MapTypeControl();
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
	// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
	map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

	// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
	var zoomControl = new kakao.maps.ZoomControl();
	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
	
	marker();
}

function marker(){

	var imageSrc = 'img/pin.png', // 마커이미지의
																									// 주소입니다
	imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
	imageOption = {
		offset : new kakao.maps.Point(27, 49)
	}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize,
			imageOption), markerPosition = new kakao.maps.LatLng(i,j); // 마커가 표시될 위치입니다

	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
		position : markerPosition,
		image : markerImage
	// 마커이미지 설정
	});
	
	marker.setDraggable(true); 

	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);  
	
	var iwContent = '<div>여기는 북한산 입니다.<br><a href="https://map.kakao.com/link/map/북한산,37.657715,126.991659" style="color:#4287f5" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/북한산,37.657715,126.991659" style="color:#4287f5" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(i,j); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
});
  
// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker); 

	// 지도에 클릭 이벤트를 등록합니다
	// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
	kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
	    
	    // 클릭한 위도, 경도 정보를 가져옵니다 
	    var latlng = mouseEvent.latLng; 
	    
	    // 마커 위치를 클릭한 위치로 옮깁니다
	    marker.setPosition(latlng);
	    
	    
	});
}


function updateRoad(roads) {
	var roadsDiv = document.getElementById("roads");
    var roads = roads.SeoulGilWalkCourse.row;

	for (var x = 0; x < num; x++) {
	
		var div = document.createElement("div");
		div.setAttribute("class", "card");
		
		//지도를 불러오기 위한 버튼을 만듭니다.
		var title = document.createElement('button');
		var titletnText = document.createTextNode('지도보기');
		title.appendChild(titletnText);
		title.setAttribute("id", x);
		title.setAttribute("class", "button");
		
		//버튼을 클릭할때 실행하는 함수입니다.
		title.addEventListener("click", function(){  
		//선택한 정보의 위치를 가져옵니다.
		check = $(this).attr("id");
		//선택한 서울 두드림길의 이름을 가져옵니다.
		var n = NAME[check];
		//링크로 걸기 위해서 공백은 없애줍니다.
		 n = n.replace(/\s/gi, ''); 
		console.log(n);
		//링크를 위해서 위도와 경도를 바꿔줍니다.
		i = X[8-check];
		j = Y[8-check];
		//구글맵으로 검색하려는 두드림길을 보여줍니다.
		window.open('https://www.google.co.kr/maps/search/'+n+'/@'+i+','+j+',15z/data=!3m1!4b1', '_blank'); 

		}, false);

		
		//두드림길의 정보를 하나씩 div로 만들어서 동적으로 추가합니다.
		div.innerHTML = "<br><br><h1>"+roads[x].COURSE_NAME + "</h1><p class='card-body-hashtag'>" +
		 		"#" + roads[x].CPI_NAME
				+ " #코스레벨 " + roads[x].COURSE_LEVEL + "</p>자치구 : "
				+ roads[x].AREA_GU + " | 거리 : " + roads[x].DISTANCE
				+ " | 소요시간 : " + roads[x].LEAD_TIME + "<br><br>"+roads[x].TRAFFIC_INFO
				+ "<br><br>세부 코스 : " + roads[x].DETAIL_COURSE+"<br><br>";
		 
		 div.appendChild(title);
	
		 //각각 두드림길의 지도를 보기 위해 필요한 두드림길 이름, 위도, 경도를 배열로 입력합니다.
		 NAME[x] = roads[x].COURSE_NAME;
		 X[x] =  roads[x].X;
		 Y[x] = roads[x].Y;
		 
		
		if (roadsDiv.childElementCount == 0) {
			roadsDiv.appendChild(div);
		} else {
			roadsDiv.insertBefore(div, roadsDiv.firstChild);
		}
	}

}