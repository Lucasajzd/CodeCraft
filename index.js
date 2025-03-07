const app = document.getElementById("app")

// Array de usuários
const users = [
  {
    email: 'test@test.com',
    phone: '19991576399',
    ref: 100,
    refBy: null
  },
  {
    email: 'tust@tust.com',
    phone: '1989674356',
    ref: 200,
    refBy: 100
  },
  {
    email: 'tost@tost.com',
    phone: '1989674356',
    ref: 300,
    refBy: 200
  }
]

const getUser = (userData) => {
  return users.find((user) => user.email === userData.email)
}

const getTotalSubscribers = (userData) => {
  return users.filter((user) => user.refBy === userData.ref).length
}

const showInvite = (userData) => {
  app.innerHTML = `
    <main>
        <h3> Inscrição confirmada!</h3>

        <p>
        Convide mais pessoas e concorra a prêmios!<br />
        Compartilhe o link e acompanhe as inscrições:
        </p>
      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="Link icon">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>

      </div>
      </main>
      <section class= "stats">
      <h4>${getTotalSubscribers(userData)}
      </h4>
      <p>Inscrições feitas</p>
      </section>
  `
  app.setAttribute('class','page-invite')
  updateImageLinks()
}
const saveUser = (userData) =>{
  const newUser = {
    ...userData,
    ref:Math.round(Math.random() * 4000),
    refBy: 100
  }
  users.push(newUser)
  console.log
  return newUser

}

const formAction = () => {
  const form = document.getElementById('form')

  form.onsubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    const userData = {
      email: formData.get('email').trim(),
      phone: formData.get('phone').trim()
    }

    console.log("Dados inseridos:", userData)
    const user = getUser(userData)
    console.log("Usuário encontrado:", user)

    if (user) {
      showInvite(user)
    } else {
     const newUser = saveUser(userData)
     showInvite(newUser)
    }
  }
}

const startApp = () => {
  app.innerHTML = `
      <main>
        <section class="about">
         <div class="section-header">
          <h2>
            Sobre o evento
          </h2>
          <span class="badge"> AO VIVO</span>
         </div>

         <p>Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
          <br/><br/>Dias 15 a 17 de março | Das 18h às 21h | Online &amp; Gratuito </p>
        </section>
        <section class="registration">
          <h2>Inscrição</h2>

          <form id="form">
            <div class="input-wrapper">
              <div class="input-group">
                <label for="email">
                  <img src="mail.svg" alt="email icon">
                </label>
                <input type="email" id="email" name="email"
                placeholder="E-mail">
            </div>

             <div class="input-group">
                <label for="phone">
                  <img src="phone.svg" alt="phone icon">
                </label>
                <input type="text" id="phone" name="phone"
                placeholder="Telefone">
            </div>

            <button>
              Confirmar
              <img src="arrow.svg" alt="Arrow right">
            </button>
            </div>
          </form>
        </section>
      </main>
  `
  app.setAttribute('class', 'page-start')
  updateImageLinks()
  formAction()
}
const updateImageLinks =() =>{
  document.querySelectorAll('img').forEach((img) => {
    if(img.src.includes('githubusercontent')){
      return
    }
    const src = img.getAttribute('src')
    img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
  })
}

startApp()
//showInvite({
//  email: 'teste@teste.com',
//  phone: '123456789',
//  ref:100
// })

document.querySelector("header").onclick = () => startApp()