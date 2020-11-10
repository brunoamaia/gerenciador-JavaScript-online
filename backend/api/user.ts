module.exports = app => {
  const save = (require, response) => {
    response.send('user save')
  }

  return {save}
}