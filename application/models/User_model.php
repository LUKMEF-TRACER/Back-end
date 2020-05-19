<?php

class User_Model extends CI_Model{
  public function insert_user($user_data){
    return $this->db->insert('users', $user_data);
  }

  public function fetch_all_users(){
    $query = $this->db->get('users');

    return $query->result();
  }

}

?>
