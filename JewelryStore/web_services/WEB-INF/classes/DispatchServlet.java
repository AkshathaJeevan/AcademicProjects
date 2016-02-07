import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;



public class DispatchServlet extends HttpServlet {
	private String command;
	private String toDo=null;

	
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

	command = request.getParameter("action");
        if(command == null)
                toDo = "/jsp/login_err.jsp";
	else if(command.equals("hello"))
		toDo = "/servlet/Hello";
	else if(command.equals("goodbye"))
		toDo = "/servlet/Goodbye";
        else if(command.equals("login"))
                toDo = "/servlet/Login";                
        else if(command.equals("dbtest"))
                toDo = "/servlet/DBTest";
	else
		toDo = "/jsp/login_err.jsp";
				
	processRequest(request, response);
	}
        
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException { 
            doPost(request, response);
            }       
	
    public void processRequest(HttpServletRequest request,
                    HttpServletResponse response)
                                throws  ServletException  {
    	ServletContext context=null;
	RequestDispatcher dispatcher = null;
    	try {
	    context = getServletContext();	
	    dispatcher = request.getRequestDispatcher(toDo);	
	    dispatcher.forward(request, response);	
	    }
	catch(Exception e) {
	    System.out.print("ToDo is " + toDo + " and dispatcher is " +
	    dispatcher);
	    e.printStackTrace();}
        }
    
}



