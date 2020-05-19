<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller
{

  public function __construct(){
		parent::__construct();

		$this->load->helper('form');
		$this->load->helper('url');
		
		$this->load->helper('directory');
		$this->load->library('upload');
    
    $this->load->model('Users_model');
  }

  public function _form()
  {
    
    $this->load->library('form_validation');

    $this->form_validation->set_rules('id', 'ID of field', 'trim|required');
    $_POST = $this->security->xss_clean($_POST);

    if($this->form_validation->run() == FALSE){
            
			// Form Validation Errors
			$data = array(
                'status' => 'There is an error!',
                'error' => $this->form_validation->error_array(),
                'message'=> validation_errors()
			);

    	//print_r($data);
      // redirect
    }else{

          $insert_data = [
            'data' => ($this->input->post('id', TRUE))
          ];
    
          //var_dump($insert_data);
          //return;
          // Delete meal

          $output = ($this->Nutrition_model->delete_meal( $insert_data ));
          //var_dump($output);

          if($output){

            $data['delete_success'] = 'This was successful!';
            $this->successful_route($data);

          }else{
            
            $data['delete_unsuccess'] = 'This was unsuccessful!';
            $this->unsuccessful_route($data);
          
          }
          
    
    }
    

  }
  


}
