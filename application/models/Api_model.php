<?php

class Api_model extends CI_Model{


  public function add_user($user_data){
    return $this->db->insert('users_tbl', $user_data);
  }


  public function get_users(){

    $query = $this->db->get('users_tbl');

    return $query->result();
  }

  public function get_location(){
/*
    $query = $this->db->where('location_tbl.location_id', 'divisions_tbl.location_id');
    $query = $this->db->get('location_tbl , divisions_tbl');
*/

      $query = $this->db->query("SELECT `location_tbl`.`location_id` AS id, `location_tbl`.`location_name` AS region, `divisions_tbl`.`division_name` AS division
        FROM `location_tbl`, `divisions_tbl`
        WHERE `location_tbl`.`location_id` = `divisions_tbl`.`location_id` ");  
      return $query->result();
  }

  public function get_user($id){

    //$query = $this->db->get_where('users_tbl', array('users_tbl.id'=>$id));

    $query = $this->db->where('id', $id);
    $query = $this->db->get('users_tbl');

    return $query->result();
  }

  public function _update($data){
    //var_dump($data);

    $this->db->where('id',$data['id']);
    $this->db->update('_tbl', $data);
    return $this->db->affected_rows();

  }

  public function _delete($data){
    //var_dump($data);

    $this->db->where('_id',$data['_id']);
    $this->db->set('_status',0);
    
    $this->db->update('_tbl', $data);
    return $this->db->affected_rows();

  }

  public function _get(){

    $query = $this->db->where('_status', 1)->get('_tbl');
    return $query->result();
  
  }

}

?>
