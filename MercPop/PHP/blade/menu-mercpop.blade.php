<!-- Menu MercPop -->
	<div id="header">
      <nav id="nav" class="navbar navbar-default navbar-static-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <h3 class="title-sm text-theme text-theme-sm"><a class="navbar-brand" href="index.html">MercPop</a></h3>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-left">
              <li class="dropdown">
                <a href="index.html">Home</a>
              </li>
              <li class="dropdown">
                <a href="#">Mercados</a>
				<ul class="dropdown-menu dropdown-menu-left" role="menu">
                    <li class="dropdown-submenu">
						<a href="#">Mercado Popular 1</a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#">Produtos</a></li>
							<li><a href="#">Lojas</a></li>
							<li><a href="#">Local</a></li>
							<li><a href="#">Sobre</a></li>
						</ul>
					</li>					
                    <li class="dropdown-submenu">
						<a href="#">Mercado Popular 2</a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#">Produtos</a></li>
							<li><a href="#">Lojas</a></li>
							<li><a href="#">Local</a></li>
							<li><a href="#">Sobre</a></li>
						</ul>
					</li>		
                    <li class="dropdown-submenu">
						<a href="#">Mercado Popular 3</a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#">Produtos</a></li>
							<li><a href="#">Lojas</a></li>
							<li><a href="#">Local</a></li>
							<li><a href="#">Sobre</a></li>
						</ul>
					</li>		
                </ul>
              </li>
			  <li class="dropdown">
                <a href="faq.html">FAQ</a>  
              </li>	
              <li class="dropdown">
                <a href="sobre.html">Sobre</a>  
              </li>  
			  <li class="dropdown">
                <a href="contato.html">Contato</a>  
              </li>
            </ul>
			<div class="navbar-right" style="margin-top:12px;margin-left:35px;">
				<div class="dropdown dropdown-login pull-left" >
					<a href="registrar.html" class="text-theme-xs a-black" >Cadastre-se</a> | 			
                    <button class="btn-menu-top" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> Entrar</button>
                    <div class="dropdown-menu dropdown-menu-right stop-prop" role="menu" aria-labelledby="dLabel">
                      <div class="wrapper-form-box">
                        <h3>Entrar</h3>
                        <form>
                          <div class="form-group">
                            <div class="input-group">
                              <span class="input-group-addon"><i class="fa fa-user"></i></span>
                              <input type="text" class="form-control" placeholder="Username">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="input-group">
                              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                              <input type="password" class="form-control" placeholder="Password">
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary text-theme-xs mr-8">Entrar</button>
                          <a href="#" class="text-theme-xs pull-right a-black">Esqueceu sua senha?</a>
                        </form>
                      </div>
                    </div>
                </div>
			  <div class="dropdown-cart pull-left">
				<button class="btn-menu-top hidden-xs" id="dShop" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-heart"></i> Desejos</button>
				<div class="dropdown-menu dropdown-menu-right dropdown-menu-cart stop-prop" role="menu" aria-labelledby="dShop">
				  <div class="panel-shopping-cart">
					<table class="table">
					  <thead>
						<tr>
						  <th class="text-center"><i class="fa fa-shopping-cart"></i></th>
						  <th>Product Name</th>
						  <th>Quantity</th>
						  <th>Total</th>
						  <th></th>
						</tr>
					  </thead>
					  <tbody>
						<tr>
						  <td class="table-first"><img class="img-responsive" src="assets/images/general/imac.png" alt="theme-img"></td>
						  <td><span class="title">Apple iMac 21.5</span></td>
						  <td><input type="text" class="form-control" maxlength="3" value="1"></td>
						  <td><span>$1249</span></td>
						  <td class="close-cart"><a href="#" class="btn btn-primary btn-sm"><i class="fa fa-times"></i></a></td>
						</tr>
						<tr>
						  <td class="table-first"><img class="img-responsive" src="assets/images/shop/80x80.gif" alt="theme-img"></td>
						  <td><span class="title">Asus Laptop</span></td>
						  <td><input type="text" class="form-control" maxlength="3" value="1"></td>
						  <td><span>$1249</span></td>
						  <td class="close-cart"><a href="#" class="btn btn-primary btn-sm"><i class="fa fa-times"></i></a></td>
						</tr>
						<tr>
						  <td class="table-first"><img class="img-responsive" src="assets/images/shop/80x80.gif" alt="theme-img"></td>
						  <td><span class="title">Lenovo Tablet</span></td>
						  <td><input type="text" class="form-control" maxlength="3" value="1"></td>
						  <td><span>$1249</span></td>
						  <td class="close-cart"><a href="#" class="btn btn-primary btn-sm "><i class="fa fa-times"></i></a></td>
						</tr>
					  </tbody>
					</table>
					<div class="panel-footer">
					  <div class="row">
						<div class="col-sm-3">
						  <a href="#" class="btn btn-default btn-sm">Continue Shopping</a>
						</div>
						<div class="col-sm-9 text-right">
						  <a href="#" class="btn btn-default btn-sm">Update Cart</a>
						  <a href="#" class="btn btn-primary btn-sm">Procceed to checkout</a>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
          </div><!--/.nav-collapse -->
        </div>
      </nav>
    </div>
<!-- Fim Menu MercPop -->
