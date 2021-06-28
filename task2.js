// @grant nodejs

$exec('node jd_star_shop.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_gold_creator.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_family.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_speed_sign.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_fruit.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_pet.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_bookshop.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_jxnc.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
