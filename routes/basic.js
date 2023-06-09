var express = require("express");
var router = express.Router();

//임시 데이터
const users = [
  { id: 1, name: "유저1" },
  { id: 2, name: "유저2" },
  { id: 3, name: "유저3" },
];

/**
 * @path {GET} /api/get/hello
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
router.get("/api/get/hello", function (req, res) {
  res.status(200).json({
    message: "hello get api",
  });
});

/**
 * @path {POST} /api/post/hello
 * @description 요청 데이터 값이 없고 반환 값이 있는 POST Method
 */
router.post("/api/post/hello", function (req, res) {
  res.status(200).json({
    message: "hello post api",
  });
});

/**
 * @path {GET} api/users
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
router.get("/api/users", (req, res) => {
  //유저 정보 반환
  res.json({ ok: true, users: users });
});

/**
 * @path {GET} http://localhost:3000/api/users/user?user_id=1
 * @description Query Params 요청 데이터 값이 있고 반환 값이 있는 GET Method
 *
 *  Query Params 방식
 *  user 뒤에 user_id변수를 통해 값을 찾아 올수 있다.
 *  &를 통해 두번째 변수를 받아서 사용할 수 있다.(/user?user_id=1&name="유저1")
 *
 */
router.get("/api/users/user", (req, res) => {
  const user_id = req.query.user_id;

  // filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
  const user = users.filter((data) => data.id == user_id);

  res.json({ ok: false, user: user });
});

/**
 * @path {GET} http://localhost:3000/api/users/userBody
 * @description Body 요청 데이터 값이 있고 반환 값이 있는 GET Method
 *
 * post로 요청시 body에 데이터를 담아서 보낼수 있듯이 get도 사용이 가능하다.
 * ==> 테스트시 express에서 body영역을 얻어오지 못한다.
 */
router.get("/api/users/userBody", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log(`body 영역을 읽어올수 없다.`);
    res.status(406);
  }

  const user_id = req.body.user_id;

  // filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
  const user = users.filter((data) => data.id == user_id);

  res.json({ ok: false, user: user });
});

/**
 * @path {GET} http://localhost:3000/api/users/:user_id
 * @description Path Variables 요청 데이터 값이 있고 반환 값이 있는 GET Method
 *
 *  Path Variables 방식
 *
 *  ex) 아래 GET 주소 에서 :user_id 는 서버에서 설정한 주소 키 값이다.
 *      값을 찾을 때는 req.params.user_id 로 값을 찾는다.
 *
 *  *주의 사항*
 *  :user_id 이 부분은 변수이기 때문에
 *  경로가 /users/1 이거나 /users/2 이거 일때 둘다 라우터를 거치게 된다.
 *  그렇기 때문에 다른 라우터 보다 아래 있어야 한다.
 */
router.get("/api/users/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  // filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
  const user = users.filter((data) => data.id == user_id);

  res.json({ ok: true, user: user });
});

/**
 * @path {POST} http://localhost:3000/api/users/add
 * @description POST Method
 *
 *  POST 데이터를 생성할 때 사용된다.
 *  req.body에 데이터를 담아서 보통 보낸다.
 */
router.post("/api/users/add", (req, res) => {
  // 구조분해를 통해 id 와 name을 추출
  const { id, name } = req.body;

  // concat 함수는 자바스크립트에서 배열 함수이다. 새로운 데이터를 추가하면 새로운 배열로 반환한다.
  const user = users.push({ id, name });

  res.json({ ok: true, users: user });
});

/**
 * @path {PUT} http://localhost:3000/api/users/update
 * @description 전체 데이터를 수정할 때 사용되는 Method
 */
router.put("/api/users/update", (req, res) => {
  // 구조분해를 통해 id 와 name을 추출
  const { id, name } = req.body;

  // map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
  const user = users.map((data) => {
    if (data.id == user_id) { // (자료형은 비교하지 않는다.~)
      data.name = name;
    }

    return {
      id: data.id,
      name: data.name,
    };
  });

  res.json({ ok: true, users: user });
});

/**
 * @path {PATCH} http://localhost:3000/api/user/update/:user_id
 * @description 단일 데이터를 수정할 때 사용되는 Method
 */
router.patch("/api/user/update/:user_id", (req, res) => {
  const { user_id } = req.params;
  const { name } = req.body;

  // map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
  const user = users.map((data) => {
    if (data.id == user_id) { // (자료형은 비교하지 않는다.~)
      data.name = name;
    }

    return {
      id: data.id,
      name: data.name,
    };
  });

  res.json({ ok: true, users: user });
});

/**
 * @path {DELETE} http://localhost:3000/api/user/delete
 * @description 데이터 삭제
 *
 */
router.delete("/api/user/delete", (req, res) => {
  const user_id = req.query.user_id;

  // filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
  // const user = users.filter((data) => data.id != user_id);

  for (var i = 0; i < users.length; i++) {
    if (users[i].id == user_id) { // 값이 같은 배열 인덱스 확인 (자료형은 비교하지 않는다.~)
      users.splice(i, 1);
    }
  }
  const user = users;

  res.json({ ok: true, users: user });
});

module.exports = router;
